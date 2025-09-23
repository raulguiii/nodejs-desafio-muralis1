document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section');
    
    // Esconde todas
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('d-none'));
    
    // Mostra a escolhida
    document.getElementById(sectionId).classList.remove('d-none');
    });
});






