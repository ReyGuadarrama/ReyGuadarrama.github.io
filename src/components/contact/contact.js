// src/components/contact/contact.js
class ContactSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <section class="contact-section" id="contact">
                <div class="contact-container">
                    <div class="contact-title">
                        <h2>Get In Touch</h2>
                        <p>Open to opportunities in quantum computing and machine learning</p>
                    </div>
                    
                    <div class="contact-content">
                        <p class="contact-text">
                            I'm currently seeking opportunities in quantum computing research and machine learning engineering roles. 
                            Whether you have a question, a potential collaboration, or just want to say hi, I'll try my best to get back to you!
                        </p>
                        
                        <div class="contact-methods">
                            <a href="mailto:luisrey7.lrv@gmail.com" 
                               class="contact-method"
                               aria-label="Send email">
                                <i class="fas fa-envelope"></i>
                                <h3>Email</h3>
                                <span>luisrey7.lrv@gmail.com</span>
                            </a>
                            
                            <a href="https://www.linkedin.com/in/reyguadarrama/" 
                               class="contact-method"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="Visit LinkedIn profile">
                                <i class="fab fa-linkedin-in"></i>
                                <h3>LinkedIn</h3>
                                <span>Connect with me</span>
                            </a>
                            
                            <a href="https://github.com/ReyGuadarrama" 
                               class="contact-method"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="Visit GitHub profile">
                                <i class="fab fa-github"></i>
                                <h3>GitHub</h3>
                                <span>View my projects</span>
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        `;

        this.initIntersectionObserver();
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
                threshold: 0.2
            }
        );

        const elements = this.querySelectorAll('.contact-text, .contact-method, .contact-socials');
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

customElements.define('contact-section', ContactSection);