/**
 * ARQUIVO JAVASCRIPT PRINCIPAL
 * Responsável pela funcionalidade do menu mobile e outras interações globais
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FUNCIONALIDADE DO MENU MOBILE =====
    
    // Seleciona o botão burger e o menu
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    // Verifica se os elementos existem na página
    if (navbarBurger && navbarMenu) {
        // Adiciona evento de clique no botão burger
        navbarBurger.addEventListener('click', function() {
            // Alterna a classe 'is-active' em ambos os elementos
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }
    
    // ===== FUNCIONALIDADE DE PESQUISA =====
    
    const searchInput = document.getElementById('pesquisa');
    
    if (searchInput) {
        // Adiciona evento de tecla pressionada no campo de pesquisa
        searchInput.addEventListener('keypress', function(event) {
            // Verifica se a tecla Enter foi pressionada
            if (event.key === 'Enter') {
                const searchTerm = this.value.trim();
                
                if (searchTerm) {
                    // Implementar lógica de pesquisa aqui
                    console.log('Pesquisando por:', searchTerm);
                    // Por enquanto, apenas exibe um alerta
                    alert('Funcionalidade de pesquisa em desenvolvimento. Termo: ' + searchTerm);
                }
            }
        });
    }
    
    // ===== SMOOTH SCROLLING PARA LINKS INTERNOS =====
    
    // Seleciona todos os links que começam com #
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Scroll suave até o elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

