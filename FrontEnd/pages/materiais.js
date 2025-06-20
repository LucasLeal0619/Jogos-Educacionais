/**
 * ARQUIVO JAVASCRIPT DA PÁGINA MATERIAIS
 * Responsável pela geração dinâmica da lista de materiais e controle do modal de PDFs
 * 
 * Funcionalidades implementadas:
 * - Geração dinâmica de cards de materiais a partir de um array de dados
 * - Abertura de PDFs em modal com iframe
 * - Controle de eventos de abertura e fechamento do modal
 * - Limpeza do iframe ao fechar o modal para otimizar performance
 */

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DADOS DOS MATERIAIS =====
    
    /**
     * Array contendo os dados dos materiais educacionais
     * Cada objeto representa um material com título, descrição e URL do PDF
     */
    const materials = [
        {
            title: "INTRODUÇÃO À GEOMETRIA ESPACIAL COM O JOGO MINECRAFT",
            description: "Neste PDF você aprenderá noções básicas de geometria no minecraft.",
            pdfUrl: "https://educapes.capes.gov.br/bitstream/capes/206568/2/produto_educacional_geometria_espacial_com_minecraft.pdf"
        },
        {
            title: "Benefícios do minecraft nos anos iniciais",
            description: "Um artigo que visa discutir o quão útil pode ser o minecraft na educação.",
            pdfUrl: "https://www.abed.org.br/congresso2022/77971.pdf"
        }
    ];
    
    // ===== SELEÇÃO DOS ELEMENTOS DO DOM =====
    
    // Seleciona a lista onde os materiais serão inseridos
    const materialsList = document.getElementById('materials-list');
    
    // Seleciona o modal para exibição de PDFs
    const pdfModal = document.getElementById('pdf-modal');
    
    // Seleciona o iframe onde o PDF será carregado
    const pdfFrame = document.getElementById('pdf-frame');
    
    // Seleciona o botão de fechar do modal
    const closeModal = pdfModal.querySelector('.modal-close');
    
    // Seleciona o fundo do modal para permitir fechamento ao clicar fora
    const modalBackground = pdfModal.querySelector('.modal-background');
    
    // ===== VERIFICAÇÃO DE EXISTÊNCIA DOS ELEMENTOS =====
    
    // Verifica se todos os elementos necessários existem na página
    if (!materialsList || !pdfModal || !pdfFrame || !closeModal || !modalBackground) {
        console.error('Erro: Elementos necessários não encontrados na página');
        return;
    }
    
    // ===== FUNÇÃO PARA CRIAR UM CARD DE MATERIAL =====
    
    /**
     * Cria um elemento HTML para um material específico
     * @param {Object} material - Objeto contendo os dados do material
     * @param {number} index - Índice do material no array (para identificação única)
     * @returns {HTMLElement} - Elemento li criado com o card do material
     */
    function createMaterialCard(material, index) {
        // Cria o elemento li que será o container do card
        const listItem = document.createElement('li');
        
        // Adiciona classes do Bulma para estilização
        listItem.classList.add('box', 'mb-4');
        
        // Define um ID único para o card
        listItem.id = `material-${index}`;
        
        // Define o conteúdo HTML do card usando template literals
        listItem.innerHTML = `
            <p class="title is-5">${material.title}</p>
            <p>${material.description}</p>
            <button class="button is-link" data-pdf-url="${material.pdfUrl}" data-material-title="${material.title}">
                <i class="fas fa-file-pdf"></i>&nbsp; Ver Material
            </button>
        `;
        
        return listItem;
    }
    
    // ===== FUNÇÃO PARA ABRIR O MODAL COM PDF =====
    
    /**
     * Abre o modal e carrega o PDF especificado no iframe
     * @param {string} pdfUrl - URL do PDF a ser carregado
     * @param {string} title - Título do material (para logs)
     */
    function openPdfModal(pdfUrl, title) {
        // Carrega o PDF no iframe
        pdfFrame.src = pdfUrl;
        
        // Adiciona a classe que torna o modal visível
        pdfModal.classList.add('is-active');
        
        // Previne o scroll da página quando o modal está aberto
        document.body.style.overflow = 'hidden';
        
        console.log(`Modal aberto para o material: ${title}`);
        console.log(`URL do PDF: ${pdfUrl}`);
    }
    
    // ===== FUNÇÃO PARA FECHAR O MODAL =====
    
    /**
     * Fecha o modal e limpa o iframe para otimizar performance
     */
    function closePdfModal() {
        // Remove a classe que torna o modal visível
        pdfModal.classList.remove('is-active');
        
        // Limpa o src do iframe para parar o carregamento do PDF
        pdfFrame.src = '';
        
        // Restaura o scroll da página
        document.body.style.overflow = 'auto';
        
        console.log('Modal fechado e iframe limpo');
    }
    
    // ===== RENDERIZAÇÃO DOS MATERIAIS =====
    
    /**
     * Itera sobre o array de materiais e cria os cards dinamicamente
     */
    materials.forEach(function(material, index) {
        // Cria o card para o material atual
        const materialCard = createMaterialCard(material, index);
        
        // Seleciona o botão dentro do card recém-criado
        const button = materialCard.querySelector('button');
        
        // ===== EVENTO DE CLIQUE NO BOTÃO DO MATERIAL =====
        
        // Adiciona evento de clique no botão "Ver Material"
        button.addEventListener('click', function(event) {
            // Previne o comportamento padrão do botão
            event.preventDefault();
            
            // Obtém a URL do PDF e o título dos atributos data
            const pdfUrl = this.getAttribute('data-pdf-url');
            const materialTitle = this.getAttribute('data-material-title');
            
            // Verifica se a URL do PDF é válida
            if (pdfUrl) {
                // Abre o modal com o PDF
                openPdfModal(pdfUrl, materialTitle);
            } else {
                console.error('URL do PDF não encontrada');
                alert('Erro: Não foi possível carregar o material.');
            }
        });
        
        // Adiciona o card à lista de materiais
        materialsList.appendChild(materialCard);
        
        console.log(`Material "${material.title}" adicionado à lista`);
    });
    
    // ===== EVENTOS DE FECHAMENTO DO MODAL =====
    
    // Evento para fechar o modal ao clicar no botão X
    closeModal.addEventListener('click', function() {
        closePdfModal();
    });
    
    // Evento para fechar o modal ao clicar no fundo escuro
    modalBackground.addEventListener('click', function() {
        closePdfModal();
    });
    
    // ===== FECHAMENTO DO MODAL COM A TECLA ESC =====
    
    // Adiciona evento para fechar o modal com a tecla Escape
    document.addEventListener('keydown', function(event) {
        // Verifica se a tecla pressionada é Escape e se o modal está aberto
        if (event.key === 'Escape' && pdfModal.classList.contains('is-active')) {
            closePdfModal();
        }
    });
    
    // ===== LOG DE INICIALIZAÇÃO =====
    
    console.log('Script da página Materiais carregado com sucesso');
    console.log(`${materials.length} materiais carregados na página`);
    console.log('Elementos encontrados:', {
        materialsList: !!materialsList,
        pdfModal: !!pdfModal,
        pdfFrame: !!pdfFrame,
        closeModal: !!closeModal,
        modalBackground: !!modalBackground
    });
});

