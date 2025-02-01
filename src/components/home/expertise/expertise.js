// src/components/expertise/expertise.js
class TechnicalExpertise extends HTMLElement {
    constructor() {
        super();
        this.expertiseData = null;
    }

    async connectedCallback() {
        try {
            await this.loadExpertiseData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading expertise data:', error);
            this.renderError();
        }
    }

    async loadExpertiseData() {
        const response = await fetch('/src/data/expertise.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.expertiseData = await response.json();
    }

    render() {
        if (!this.expertiseData) return;

        this.innerHTML = `
            <section class="expertise-section">
                <div class="expertise-container">
                    <div class="expertise-title">
                        <h2>${this.expertiseData.sectionTitle}</h2>
                        <p>${this.expertiseData.sectionSubtitle}</p>
                    </div>
                    
                    <div class="expertise-grid">
                        ${this.expertiseData.categories.map(category => 
                            this.createExpertiseCard(category)
                        ).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createExpertiseCard(category) {
        return `
            <div class="expertise-card">
                <i class="fas fa-${category.icon} expertise-icon"></i>
                <h3>${category.title}</h3>
                <ul class="expertise-list">
                    ${category.skills.map(skill => 
                        `<li>${skill}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="expertise-section">
                <div class="expertise-container">
                    <div class="expertise-title">
                        <h2>Technical Expertise</h2>
                        <p>Error loading content. Please try again later.</p>
                    </div>
                </div>
            </section>
        `;
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        this.querySelectorAll('.expertise-card').forEach(card => {
            observer.observe(card);
        });
    }
}

customElements.define('technical-expertise', TechnicalExpertise);