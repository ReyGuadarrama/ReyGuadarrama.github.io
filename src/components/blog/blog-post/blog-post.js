document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize code blocks with line numbers
    document.querySelectorAll('pre code').forEach((block) => {
        // First apply syntax highlighting if hljs is available
        if (window.hljs) {
            hljs.highlightElement(block);
        }
        
        // Add line numbers
        let lines = block.innerHTML.split('\n');
        block.innerHTML = lines.map((line, index) => {
            if (line.trim() === '') {
                return `<span class="line"> </span>`;
            } else {
                return `<span class="line">${line}</span>`
            }
        }).join('');
    });
});