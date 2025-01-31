// src/components/research-projects/research-projects.js
class ResearchProjects extends HTMLElement {
    constructor() {
        super();
        this.researchData = null;
    }

    async connectedCallback() {
        try {
            await this.loadResearchData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading research projects data:', error);
            this.renderError();
        }
    }

    async loadResearchData() {
        const response = await fetch('/src/data/research-projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.researchData = await response.json();
    }

    render() {
        if (!this.researchData) return;

        this.innerHTML = `
            <section class="research-section">
                <div class="section-container">
                    <div class="section-header">
                        <h2>${this.researchData.sectionTitle}</h2>
                        <p>${this.researchData.sectionSubtitle}</p>
                    </div>
                    
                    <div class="research-grid">
                        ${this.researchData.projects.map(project => 
                            this.createResearchCard(project)
                        ).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createResearchCard(project) {
        return `
            <div class="research-card">
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => 
                            `<span>${tech}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="research-section">
                <div class="section-container">
                    <div class="section-header">
                        <h2>Research Projects</h2>
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

        this.querySelectorAll('.research-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

customElements.define('research-projects', ResearchProjects);