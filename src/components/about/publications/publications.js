// src/components/publications/publications.js
class PublicationsSection extends HTMLElement {
    constructor() {
        super();
        this.publicationsData = null;
    }

    async connectedCallback() {
        try {
            await this.loadPublicationsData();
            this.render();
            this.initIntersectionObserver();
        } catch (error) {
            console.error('Error loading publications data:', error);
            this.renderError();
        }
    }

    async loadPublicationsData() {
        const response = await fetch('/src/data/publications.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.publicationsData = await response.json();
    }

    createPublicationCard(publication, isLinked = false) {
        const cardContent = `
            <h3>${publication.title}</h3>
            <div class="authors">${publication.authors}</div>
            <div class="journal">${publication.journal}</div>
            ${publication.doi ? `<div class="DOI">${publication.doi}</div>` : ''}
            ${publication.status ? `<div class="status">${publication.status}</div>` : ''}
        `;

        if (isLinked && publication.link) {
            return `
                <a href="${publication.link}" class="publication-card-linked" target="_blank" rel="noopener noreferrer">
                    ${cardContent}
                </a>
            `;
        }

        return `
            <div class="publication-card">
                ${cardContent}
            </div>
        `;
    }

    render() {
        if (!this.publicationsData) return;

        this.innerHTML = `
            <section class="publications-section">
                <div class="publications-container">
                    <div class="publications-header">
                        <h2>${this.publicationsData.title}</h2>
                    </div>
                    
                    ${Object.entries(this.publicationsData.categories).map(([category, items]) => `
                        <div class="publication-category">
                            <h3 class="publication-type">${category}</h3>
                            ${items.map(pub => this.createPublicationCard(pub, pub.link !== undefined)).join('')}
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="publications-section">
                <div class="publications-container">
                    <div class="publications-header">
                        <h2>Publications & Research</h2>
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

        this.querySelectorAll('.publication-card, .publication-card-linked').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.03}s`;
            observer.observe(card);
        });
    }
}

customElements.define('publications-section', PublicationsSection);