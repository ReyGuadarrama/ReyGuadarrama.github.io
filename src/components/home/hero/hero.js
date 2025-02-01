// src/components/hero/hero.js
class Hero extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <section class="hero-section">
                <div class="hero-container">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h1 class="hero-title">Rey Guadarrama</h1>
                            <p class="hero-subtitle">
                                Physics Student, Quantum Computing & Machine Learning Researcher
                            </p>
                            <p class="hero-description">
                                Physics student at BUAP specializing in quantum computing and machine learning. 
                                Current research focuses on quantum generative models and high-energy physics simulations. 
                                Google Summer of Code 2024 alumni, QOSF mentee, and EMFUTECH by Mirai Innovation Lab participant.
                            </p>
                            <div class="hero-buttons">
                                <a href="#contact" class="hero-button-primary">
                                    Contact Me
                                </a>
                                <a href="/html/portfolio.html" class="hero-button-secondary">
                                    View Portfolio
                                </a>
                            </div>
                        </div>
                        <div class="hero-image">
                            <img 
                                src="/images/logos_portraits/me.jpg"
                                alt="Profile photo of Rey Guadarrama"
                                class="hero-profile-img"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-hero', Hero);