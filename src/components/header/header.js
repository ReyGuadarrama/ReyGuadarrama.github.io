// src/components/header/header.js
class Header extends HTMLElement {
    constructor() {
        super();
        this.isMenuOpen = false;
        this.theme = localStorage.getItem('theme') || 'light';
    }

    connectedCallback() {
        this.render();
        this.initializeMenuToggle();
        this.setupAccessibility();
        this.handleResize();
        this.setupTheme();
    }

    render() {
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
                            <li><a href="/src/content/portfolio.html">PORTFOLIO</a></li>
                            <li><a href="/html/blog.html">BLOG</a></li>
                        </ul>
                        <button class="theme-toggle" aria-label="Toggle dark mode">
                            <i class="fas fa-moon moon-icon"></i>
                            <i class="fas fa-sun sun-icon"></i>
                        </button>
                    </nav>
                </div>
                <div class="gradient-strip"></div>
            </header>
        `;
    }

    setupTheme() {
        const toggle = this.querySelector('.theme-toggle');
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleState();

        // Add click event listener
        toggle.addEventListener('click', () => this.toggleTheme());

        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', this.theme);
                this.updateToggleState();
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateToggleState();
    }

    updateToggleState() {
        const toggle = this.querySelector('.theme-toggle');
        toggle.classList.toggle('dark', this.theme === 'dark');
    }

    initializeMenuToggle() {
        const menuToggle = this.querySelector('.menu-toggle');
        const navUl = this.querySelector('nav ul');

        menuToggle?.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            navUl.classList.toggle('show');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', this.isMenuOpen);
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        });

        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    setupAccessibility() {
        const menuToggle = this.querySelector('.menu-toggle');
        const navUl = this.querySelector('nav ul');

        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-controls', 'nav-menu');
        navUl?.setAttribute('id', 'nav-menu');
        
        menuToggle?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });
    }

    handleResize() {
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