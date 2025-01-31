// src/components/technical-skills/technical-skills.js
class TechnicalSkills extends HTMLElement {
    constructor() {
        super();
        this.skillsData = null;
    }

    async connectedCallback() {
        try {
            await this.loadSkillsData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading skills data:', error);
            this.renderError();
        }
    }

    async loadSkillsData() {
        const response = await fetch('/src/data/technical-skills.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.skillsData = await response.json();
    }

    render() {
        if (!this.skillsData) return;

        this.innerHTML = `
            <section class="skills-section">
                <div class="section-container">
                    <div class="section-header">
                        <h2>${this.skillsData.sectionTitle}</h2>
                        <p>${this.skillsData.sectionSubtitle}</p>
                    </div>
                    
                    <div class="skills-grid">
                        ${this.skillsData.categories.map(category => 
                            this.createSkillCategory(category)
                        ).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createSkillCategory(category) {
        return `
            <div class="skill-category">
                <h3>
                    <i class="fas fa-${category.icon}"></i>
                    ${category.title}
                </h3>
                <ul>
                    ${category.skills.map(skill => 
                        `<li>${skill}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="skills-section">
                <div class="section-container">
                    <div class="section-header">
                        <h2>Technical Expertise & Tools</h2>
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

        this.querySelectorAll('.skill-category').forEach((category, index) => {
            category.style.transitionDelay = `${index * 0.03}s`;
            observer.observe(category);
        });
    }
}

customElements.define('technical-skills', TechnicalSkills);