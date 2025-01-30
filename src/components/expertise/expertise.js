// src/components/expertise/expertise.js
class TechnicalExpertise extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const expertiseData = [
            {
                icon: 'atom',
                title: 'Quantum Computing',
                skills: [
                    'Quantum Machine Learning',
                    'Quantum Algorithms',
                    'PennyLane, Qiskit, Cirq',
                    'Hybrid Quantum-Classical Systems',
                    'Quantum Complexity Theory'
                ]
            },
            {
                icon: 'brain',
                title: 'Machine Learning',
                skills: [
                    'Neural Network Architecture',
                    'Generative Adversarial Networks',
                    'Optimization Techniques',
                    'Computer Vision',
                    'Deep Learning'
                ]
            },
            {
                icon: 'rocket',
                title: 'Physics & Mathematics',
                skills: [
                    'Quantum Mechanics',
                    'Classical Mechanics',
                    'Probability Theory',
                    'Linear Algebra',
                    'Computational Physics'
                ]
            }
        ];

        this.innerHTML = `
            <section class="expertise-section">
                <div class="expertise-container">
                    <div class="expertise-title">
                        <h2>Technical Expertise</h2>
                        <p>Specialized skills in quantum computing and machine learning</p>
                    </div>
                    
                    <div class="expertise-grid">
                        ${expertiseData.map(category => this.createExpertiseCard(category)).join('')}
                    </div>
                </div>
            </section>
        `;

        // Initialize intersection observer for animation
        this.initIntersectionObserver();
    }

    createExpertiseCard(category) {
        return `
            <div class="expertise-card">
                <i class="fas fa-${category.icon} expertise-icon"></i>
                <h3>${category.title}</h3>
                <ul class="expertise-list">
                    ${category.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all expertise cards
        this.querySelectorAll('.expertise-card').forEach(card => {
            observer.observe(card);
        });
    }
}

customElements.define('technical-expertise', TechnicalExpertise);