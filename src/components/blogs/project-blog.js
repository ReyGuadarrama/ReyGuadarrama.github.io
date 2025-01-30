// src/components/projects-blog/projects-blog.js
class ProjectsBlog extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const projectsData = [
            {
                image: '/images/GSoC-2024/GSoC-logo.png',
                title: 'QGANs for Monte Carlo Simulations',
                description: 'Implementing quantum generative adversarial networks for Monte Carlo simulations during Google Summer of Code 2024.',
                link: '/posts/GSoC-2024.html',
                status: 'Read More'
            },
            {
                image: '/images/QOSF-2024/qosf_logo.png',
                title: 'Quantum Sudoku Solver with NISQ',
                description: 'Solving 9x9 Sudoku puzzles using quantum computing in the QOSF Mentorship Program.',
                link: '/posts/comming_soon.html',
                status: 'Coming soon'
            },
            {
                image: '/images/SGD_optimizers/gradient_descent.png',
                title: 'Gradient Descent Optimizers',
                description: 'A comprehensive review of commonly used gradient descent optimization algorithms.',
                link: '/posts/comming_soon.html',
                status: 'Coming soon'
            }
        ];

        this.innerHTML = `
            <section class="projects-blog-section">
                <div class="projects-blog-container">
                    <div class="projects-blog-title">
                        <h2>Featured Projects & Blog</h2>
                        <p>Exploring quantum computing and machine learning through practical applications</p>
                    </div>
                    
                    <div class="projects-grid">
                        ${projectsData.map(project => this.createProjectCard(project)).join('')}
                    </div>
                </div>
            </section>
        `;

        this.initIntersectionObserver();
    }

    createProjectCard(project) {
        return `
            <a href="${project.link}" class="project-card">
                <div class="project-image-container">
                    <img 
                        class="project-image" 
                        src="${project.image}" 
                        alt="${project.title}"
                        loading="lazy"
                    >
                    <div class="project-overlay"></div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="project-link">
                        ${project.status} 
                        ${project.status === 'Read More' ? '<i class="fas fa-arrow-right"></i>' : ''}
                    </span>
                </div>
            </a>
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

        this.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

customElements.define('projects-blog', ProjectsBlog);