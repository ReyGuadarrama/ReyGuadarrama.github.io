// src/components/education/education-section.js
class EducationSection extends HTMLElement {
    constructor() {
        super();
        this.educationData = null;
    }

    async connectedCallback() {
        try {
            await this.loadEducationData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading education data:', error);
            this.renderError();
        }
    }

    async loadEducationData() {
        const response = await fetch('/src/data/education.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.educationData = await response.json();
    }

    render() {
        if (!this.educationData) return;

        this.innerHTML = `
            <section class="education-section">
                <div class="education-container">
                    <div class="education-header">
                        <h2>${this.educationData.title}</h2>
                    </div>
                    
                    <div class="education-timeline">
                        ${this.educationData.timeline.map(item => `
                            <div class="timeline-item">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <div class="date">${item.date}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="education-section">
                <div class="education-container">
                    <div class="education-header">
                        <h2>Education & Research</h2>
                    </div>
                    <p class="error-message">Error loading content. Please try again later.</p>
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

        this.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.03}s`;
            observer.observe(item);
        });
    }
}

customElements.define('education-section', EducationSection);