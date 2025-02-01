// src/components/blog/blog.js
class BlogSection extends HTMLElement {
    constructor() {
        super();
        this.blogData = null;
        this.activeCategory = 'All';
    }

    async connectedCallback() {
        try {
            await this.loadBlogData();
            this.render();
            this.initializeListeners();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading blog data:', error);
            this.renderError();
        }
    }

    async loadBlogData() {
        const response = await fetch('/src/data/blog-posts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.blogData = await response.json();
    }

    render() {
        if (!this.blogData) return;

        this.innerHTML = `
            <section class="blog-section">
                <div class="blog-container">
                    <div class="blog-header">
                        <h1>${this.blogData.sectionTitle}</h1>
                        <p>${this.blogData.sectionSubtitle}</p>
                    </div>

                    <div class="categories">
                        <span class="category-tag active" data-category="All">All</span>
                        ${this.getUniqueCategories().map(category => 
                            `<span class="category-tag" data-category="${category}">${category}</span>`
                        ).join('')}
                    </div>

                    <div class="blog-grid">
                        ${this.renderBlogPosts()}
                    </div>
                </div>
            </section>
        `;
    }

    getUniqueCategories() {
        const categories = new Set();
        this.blogData.posts.forEach(post => {
            post.categories.forEach(category => categories.add(category));
        });
        return Array.from(categories);
    }

    renderBlogPosts() {
        return this.blogData.posts
            .filter(post => this.activeCategory === 'All' || 
                          post.categories.includes(this.activeCategory))
            .map(post => this.createBlogPostCard(post))
            .join('');
    }

    createBlogPostCard(post) {
        return `
            <article class="blog-post">
                <a href="${post.link}" class="blog-post-link">
                    <div class="blog-post-content">
                        <div class="blog-post-image" style="background-image: url('${post.image}');">
                        </div>
                        <div class="blog-post-text">
                            <div>
                                <span class="post-label">${post.categories[0]}</span>
                                <h2>${post.title}</h2>
                                <p>${post.description}</p>
                            </div>
                            <div>
                                <div class="post-meta">
                                    <img src="${post.author.avatar}" alt="${post.author.name}">
                                    <div class="post-meta-text">
                                        <span class="author-name">${post.author.name}</span>
                                        <span class="post-date">${post.date} · ${post.readTime}</span>
                                    </div>
                                </div>
                                <span class="blog-status">${post.status} 
                                    <i class="fas ${post.status === 'Read More' ? 'fa-arrow-right' : 'fa-hourglass'}"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="blog-section">
                <div class="blog-container">
                    <div class="blog-header">
                        <h1>Blog & Articles</h1>
                        <p>Error loading content. Please try again later.</p>
                    </div>
                </div>
            </section>
        `;
    }

    initializeListeners() {
        const categoryTags = this.querySelectorAll('.category-tag');
        categoryTags.forEach(tag => {
            tag.addEventListener('click', () => this.handleCategoryClick(tag));
        });
    }

    handleCategoryClick(clickedTag) {
        // Remove active class from all tags
        this.querySelectorAll('.category-tag').forEach(tag => {
            tag.classList.remove('active');
        });

        // Add active class to clicked tag
        clickedTag.classList.add('active');

        // Update active category and re-render posts
        this.activeCategory = clickedTag.dataset.category;
        const blogGrid = this.querySelector('.blog-grid');
        blogGrid.innerHTML = this.renderBlogPosts();

        // Reinitialize intersection observer for new posts
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        this.querySelectorAll('.blog-post').forEach((post, index) => {
            post.classList.remove('animate'); // Reset animation
            post.style.transitionDelay = `${index * 0.03}s`;
            observer.observe(post);
        });
    }
}

customElements.define('blog-section', BlogSection);