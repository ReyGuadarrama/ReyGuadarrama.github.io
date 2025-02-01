// src/components/blog/coming-soon/coming-soon.js
class ComingSoon extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="coming-soon" id="cs">
                <article class="coming-soon-container">
                    <div class="cs-header">
                        <h1 class="cs-title">Coming Soon!</h1>
                        <div class="cs-meta">
                            <img src="/images/logos_portraits/me.png" alt="Rey Guadarrama" class="cs-avatar">
                            <div>
                                <span>Rey Guadarrama</span>
                                <br>
                                <time datetime="2024">Expected: Summer 2025</time>
                            </div>
                        </div>
                    </div>
                    <div class="cs-content">
                        <i class="fas fa-tools cs-icon"></i>
                        <h2>This Post is Under Construction</h2>
                        <p>
                            I'm currently working on this content. Check back soon for interesting insights and detailed analysis. 
                            In the meantime, feel free to explore my other blog posts!
                        </p>
                        <a href="/src/content/blog.html" class="cs-button">
                            Back to Blog
                        </a>
                    </div>
                </article>
            </div>
        `;
    }
}

customElements.define('coming-soon', ComingSoon);