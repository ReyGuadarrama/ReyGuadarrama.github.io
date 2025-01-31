// src/components/about/about-section.js
class AboutSection extends HTMLElement {
    constructor() {
        super();
        this.aboutData = null;
    }

    async connectedCallback() {
        try {
            await this.loadAboutData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading about data:', error);
            this.renderError();
        }
    }

    async loadAboutData() {
        const response = await fetch('/src/data/about.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.aboutData = await response.json();
    }

    render() {
        if (!this.aboutData) return;

        this.innerHTML = `
            <section class="about-section">
                <div class="about-container">
                    <div class="about-header">
                        <h1>${this.aboutData.title}</h1>
                    </div>
                    <div class="about-content">
                        <div class="about-text">
                            ${this.aboutData.description.map(paragraph => 
                                `<p>${paragraph}</p>`
                            ).join('')}
                        </div>
                        <div class="about-highlights">
                            ${this.aboutData.highlights.map(highlight => `
                                <div class="highlight-item">
                                    <strong>${highlight.title}:</strong> ${highlight.content}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="about-section">
                <div class="about-container">
                    <div class="about-header">
                        <h1>About Me</h1>
                    </div>
                    <div class="about-content">
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
                        const content = entry.target;
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                        observer.unobserve(content);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        const elements = this.querySelectorAll('.about-text, .about-highlights');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.5s ease ${index * 0.2}s`;
            observer.observe(el);
        });
    }
}

customElements.define('about-section', AboutSection);