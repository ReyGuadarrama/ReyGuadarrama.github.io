// src/components/projects-blog/projects-blog.js
class ProjectsBlog extends HTMLElement {
    constructor() {
        super();
        this.projectsData = null;
    }

    async connectedCallback() {
        try {
            await this.loadProjectsData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading projects data:', error);
            this.renderError();
        }
    }

    async loadProjectsData() {
        const response = await fetch('/src/data/blogs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.projectsData = await response.json();
    }

    render() {
        if (!this.projectsData) return;

        this.innerHTML = `
            <section class="projects-blog-section">
                <div class="projects-blog-container">
                    <div class="projects-blog-title">
                        <h2>${this.projectsData.sectionTitle}</h2>
                        <p>${this.projectsData.sectionSubtitle}</p>
                    </div>
                    
                    <div class="projects-grid">
                        ${this.projectsData.projects.map(project => 
                            this.createProjectCard(project)
                        ).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createProjectCard(project) {
        return `
            <a href="${project.link}" class="project-card">
                <div class="project-image-container">
                    <img 
                        class="project-image" 
                        src="${project.image}" 
                        alt="${project.title}"
                        loading="lazy"
                    >
                    <div class="project-overlay"></div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="project-link">
                        ${project.status} 
                        ${project.status === 'Read More' ? 
                            '<i class="fas fa-arrow-right"></i>' : 
                            ''}
                    </span>
                </div>
            </a>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="projects-blog-section">
                <div class="projects-blog-container">
                    <div class="projects-blog-title">
                        <h2>Featured Projects & Blog</h2>
                        <p>Error loading content. Please try again later.</p>
                    </div>
                </div>
            </section>
        `;
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

        this.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

customElements.define('projects-blog', ProjectsBlog);