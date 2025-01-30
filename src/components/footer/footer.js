// src/components/footer/footer.js
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="social-icons">
                    <a href="https://www.linkedin.com/in/reyguadarrama/" 
                       target="_blank" 
                       rel="noopener" 
                       aria-label="LinkedIn Profile">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/ReyGuadarrama" 
                       target="_blank" 
                       rel="noopener"
                       aria-label="GitHub Profile">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="mailto:luisrey7.lrv@gmail.com"
                       aria-label="Email Contact">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
                <p class="copyright">&copy; ${new Date().getFullYear()} All rights reserved.</p>
            </footer>
        `;
    }
}

customElements.define('site-footer', Footer);