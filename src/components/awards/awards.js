// src/components/awards/awards.js
class Awards extends HTMLElement {
    constructor() {
        super();
        this.awardsData = null;
    }

    async connectedCallback() {
        try {
            await this.loadAwardsData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading awards data:', error);
            this.renderError();
        }
    }

    async loadAwardsData() {
        const response = await fetch('/src/data/awards.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.awardsData = await response.json();
    }

    render() {
        if (!this.awardsData) return;

        this.innerHTML = `
            <section class="awards-section">
                <div class="section-container">
                    <div class="section-header">
                        <h2>${this.awardsData.sectionTitle}</h2>
                        <p>${this.awardsData.sectionSubtitle}</p>
                    </div>
                    
                    <div class="awards-grid">
                        ${this.awardsData.awards.map(award => 
                            this.createAwardCard(award)
                        ).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createAwardCard(award) {
        return `
            <div class="award-card">
                <i class="fas fa-${award.icon}"></i>
                <h3>${award.title}</h3>
                <p>${award.description}</p>
            </div>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="awards-section">
                <div class="section-container">
                    <div class="section-header">
                        <h2>Honors & Awards</h2>
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

        this.querySelectorAll('.award-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.03}s`;
            observer.observe(card);
        });
    }
}

customElements.define('awards-section', Awards);