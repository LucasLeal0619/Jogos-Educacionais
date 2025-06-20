/**
 * ARQUIVO JAVASCRIPT DA PÁGINA BIBLIOTECA
 * Responsável pela funcionalidade do modal de vídeos e interações dos cards de cursos
 * 
 * Funcionalidades implementadas:
 * - Abertura e fechamento de modal para exibição de vídeos
 * - Controle de eventos de clique nos botões
 * - Fechamento do modal ao clicar no fundo (background)
 */

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SELEÇÃO DOS ELEMENTOS DO DOM =====
    
    // Seleciona o elemento modal principal
    const modal = document.getElementById('myModal');
    
    // Seleciona o botão que abre o modal (botão "Assistir")
    const openModalBtn = document.getElementById('openModal');
    
    // Seleciona o botão X para fechar o modal (no cabeçalho)
    const closeModalBtn = document.getElementById('closeModal');
    
    // Seleciona todos os botões que podem fechar o modal (X e "Concluído")
    const closeModalBtns = document.querySelectorAll('#closeModal, #closeModalBtn');
    
    // Seleciona o fundo do modal para permitir fechamento ao clicar fora
    const modalBackground = document.querySelector('.modal-background');
    
    // ===== VERIFICAÇÃO DE EXISTÊNCIA DOS ELEMENTOS =====
    
    // Verifica se todos os elementos necessários existem na página
    if (!modal || !openModalBtn || !closeModalBtn || !modalBackground) {
        console.error('Erro: Elementos do modal não encontrados na página');
        return;
    }
    
    // ===== FUNÇÃO PARA ABRIR O MODAL =====
    
    /**
     * Abre o modal adicionando a classe 'is-active' do Bulma
     * Esta classe torna o modal visível na tela
     */
    function openModal() {
        modal.classList.add('is-active');
        
        // Previne o scroll da página quando o modal está aberto
        document.body.style.overflow = 'hidden';
        
        console.log('Modal aberto com sucesso');
    }
    
    // ===== FUNÇÃO PARA FECHAR O MODAL =====
    
    /**
     * Fecha o modal removendo a classe 'is-active' do Bulma
     * Também restaura o scroll da página
     */
    function closeModal() {
        modal.classList.remove('is-active');
        
        // Restaura o scroll da página
        document.body.style.overflow = 'auto';
        
        console.log('Modal fechado com sucesso');
    }
    
    // ===== EVENTOS DE ABERTURA DO MODAL =====
    
    // Adiciona evento de clique no botão "Assistir"
    openModalBtn.addEventListener('click', function(event) {
        // Previne o comportamento padrão do botão
        event.preventDefault();
        
        // Chama a função para abrir o modal
        openModal();
    });
    
    // ===== EVENTOS DE FECHAMENTO DO MODAL =====
    
    // Adiciona eventos de clique em todos os botões de fechar
    closeModalBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            // Previne o comportamento padrão do botão
            event.preventDefault();
            
            // Chama a função para fechar o modal
            closeModal();
        });
    });
    
    // ===== FECHAMENTO DO MODAL AO CLICAR NO FUNDO =====
    
    // Adiciona evento para fechar o modal ao clicar no fundo escuro
    modalBackground.addEventListener('click', function() {
        closeModal();
    });
    
    // ===== FECHAMENTO DO MODAL COM A TECLA ESC =====
    
    // Adiciona evento para fechar o modal com a tecla Escape
    document.addEventListener('keydown', function(event) {
        // Verifica se a tecla pressionada é Escape e se o modal está aberto
        if (event.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });
    
    // ===== LOG DE INICIALIZAÇÃO =====
    
    console.log('Script da página Biblioteca carregado com sucesso');
    console.log('Elementos encontrados:', {
        modal: !!modal,
        openModalBtn: !!openModalBtn,
        closeModalBtn: !!closeModalBtn,
        modalBackground: !!modalBackground
    });
});

