// src/components/header/header.js
class Header extends HTMLElement {
    constructor() {
        super();
        this.isMenuOpen = false;
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container">
                    <nav class="header-navbar">
                        <div class="menu-toggle" aria-label="Toggle menu" role="button" tabindex="0">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <ul>
                            <li><a href="/index.html">HOME</a></li>
                            <li><a href="/src/content/about.html">ABOUT</a></li>
                            <li><a href="/html/portfolio.html">PORTFOLIO</a></li>
                            <li><a href="/html/blog.html">BLOG</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="gradient-strip"></div>
            </header>
        `;

        this.initializeMenuToggle();
        this.setupAccessibility();
        this.handleResize();
    }

    initializeMenuToggle() {
        const menuToggle = this.querySelector('.menu-toggle');
        const navUl = this.querySelector('nav ul');

        menuToggle?.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            navUl.classList.toggle('show');
            menuToggle.classList.toggle('active');
            
            // Toggle aria-expanded
            menuToggle.setAttribute('aria-expanded', this.isMenuOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    setupAccessibility() {
        const menuToggle = this.querySelector('.menu-toggle');
        const navUl = this.querySelector('nav ul');

        // Add ARIA attributes
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-controls', 'nav-menu');
        navUl?.setAttribute('id', 'nav-menu');
        
        // Add keyboard navigation
        menuToggle?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });
    }

    handleResize() {
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    closeMenu() {
        const menuToggle = this.querySelector('.menu-toggle');
        const navUl = this.querySelector('nav ul');

        this.isMenuOpen = false;
        navUl.classList.remove('show');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

customElements.define('site-header', Header);