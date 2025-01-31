// src/components/featured-projects/featured-projects.js
class FeaturedProjects extends HTMLElement {
    constructor() {
        super();
        this.featuredData = null;
    }

    async connectedCallback() {
        try {
            await this.loadFeaturedData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading featured projects data:', error);
            this.renderError();
        }
    }

    async loadFeaturedData() {
        const response = await fetch('/src/data/featured-projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.featuredData = await response.json();
    }

    render() {
        if (!this.featuredData) return;

        this.innerHTML = `
            <section class="featured-section">
                <div class="section-container">
                    <div class="section-header">
                        <h1>${this.featuredData.sectionTitle}</h1>
                        <p>${this.featuredData.sectionSubtitle}</p>
                    </div>
                    
                    <div class="featured-grid">
                        ${this.featuredData.projects.map(project => 
                            this.createProjectCard(project)
                        ).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createProjectCard(project) {
        return `
            <div class="featured-card">
                <div class="card-content">
                    <div class="project-type">${project.type}</div>
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => 
                            `<span>${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="project-links">
                        ${this.createProjectLinks(project.links)}
                    </div>
                </div>
            </div>
        `;
    }

    createProjectLinks(links) {
        return Object.entries(links).map(([type, url]) => `
            <a href="${url}" target="_blank" class="btn-link">
                <i class="fas fa-${type === 'repository' ? 'github' : 'book'}"></i>
                ${type.charAt(0).toUpperCase() + type.slice(1)}
            </a>
        `).join('');
    }

    renderError() {
        this.innerHTML = `
            <section class="featured-section">
                <div class="section-container">
                    <div class="section-header">
                        <h1>Featured Projects</h1>
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

        this.querySelectorAll('.featured-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

customElements.define('featured-projects', FeaturedProjects);