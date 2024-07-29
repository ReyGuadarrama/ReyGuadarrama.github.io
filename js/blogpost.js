
// Menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });
});

// Codeblock lines
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
        
        // Agregar números de línea
        let lines = block.innerHTML.split('\n');
        block.innerHTML = lines.map((line, index) => {
            if (line.trim() === '') {
                return `<span class="line"> </span>`;
            } else {
                return `<span class="line">${line}</span>`
            }
        }
        ).join('');
    });
});


//
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('section');

    // Función para actualizar el ítem activo
    function setActiveMenuItem() {
    let index = sections.length;

    while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
    
    menuItems.forEach((item) => item.classList.remove('active'));
    menuItems[index].classList.add('active');

    // Remover la barra azul existente
    const existingBar = document.querySelector('.blue-bar');
    if (existingBar) existingBar.remove();
    
    // Agregar la nueva barra azul
    const blueBar = document.createElement('div');
    blueBar.className = 'blue-bar';
    menuItems[index].prepend(blueBar);
    }

    // Actualizar el ítem activo al desplazarse
    window.addEventListener('scroll', setActiveMenuItem);

    // Desplazamiento suave al hacer clic en un ítem del menú
    menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });
  });
});

// Establecer el ítem activo inicial
setActiveMenuItem();
});