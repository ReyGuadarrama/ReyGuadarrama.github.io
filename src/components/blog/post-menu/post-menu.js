// src/components/blog/post-menu/post-menu.js
class BlogPostMenu extends HTMLElement {
    constructor() {
        super();
        this.sections = [];
        this.activeMenuItem = null;
    }

    connectedCallback() {
        this.render();
        this.initializeMenu();
    }

    render() {
        // Get sections from data attribute or default ones
        const menuItems = this.getAttribute('menu-items');
        const items = menuItems ? JSON.parse(menuItems) : [];

        this.innerHTML = `
            <div class="menu-container">
                ${items.map(item => `
                    <a href="#${item.id}" class="menu-item">
                        <span>${item.title}</span>
                    </a>
                `).join('')}
            </div>
        `;
    }

    initializeMenu() {
        const menuItems = this.querySelectorAll('.menu-item');
        this.sections = Array.from(document.querySelectorAll('section[id]'));

        // Update active menu item on scroll
        window.addEventListener('scroll', () => {
            let index = this.sections.length;
            
            while(--index && window.scrollY + 50 < this.sections[index].offsetTop) {}
            
            menuItems.forEach((item) => item.classList.remove('active'));
            if (menuItems[index]) {
                menuItems[index].classList.add('active');

                // Remove existing blue bar
                const existingBar = this.querySelector('.blue-bar');
                if (existingBar) existingBar.remove();
                
                // Add new blue bar
                const blueBar = document.createElement('div');
                blueBar.className = 'blue-bar';
                menuItems[index].prepend(blueBar);
            }
        });

        // Smooth scroll on menu item click
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Set initial active state
        const setInitialActive = () => {
            const firstMenuItem = menuItems[0];
            if (firstMenuItem) {
                firstMenuItem.classList.add('active');
                const blueBar = document.createElement('div');
                blueBar.className = 'blue-bar';
                firstMenuItem.prepend(blueBar);
            }
        };

        setInitialActive();
    }
}

customElements.define('blog-post-menu', BlogPostMenu);