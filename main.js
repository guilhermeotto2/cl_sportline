function redirectToBasePage(card) {
    const imgUrl = card.getAttribute('data-img');
    window.location.href = `base_buy.html?img=${encodeURIComponent(imgUrl)}`;
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imgUrl = urlParams.get('img');
    const cardTitle = urlParams.get('title');

    if (imgUrl) {
        document.getElementById('cardImage').src = imgUrl;
    }

    if (cardTitle) {
        document.getElementById('cardTitle').textContent = cardTitle;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar produto por ID
    const getProductById = (produtos, id) => {
        return produtos.produtos.find(produto => produto.id === id);
    };

    // Função para atualizar o preço e disponibilidade baseado no tamanho selecionado
    const updateProductDetails = (produto, tamanhoSelecionado) => {
        const tamanhoInfo = produto.tamanhos[tamanhoSelecionado];
        const cardPrice = document.getElementById('cardPrice');
        cardPrice.textContent = `R$ ${tamanhoInfo.preco.toFixed(2)} - ${tamanhoInfo.disponivel ? 'Disponível' : 'Indisponível'}`;

        // Atualizar a cor dos botões baseado na disponibilidade
        updateButtonStyle('buttonP', produto.tamanhos['P'].disponivel);
        updateButtonStyle('buttonM', produto.tamanhos['M'].disponivel);
        updateButtonStyle('buttonG', produto.tamanhos['G'].disponivel);
        updateButtonStyle('buttonGG', produto.tamanhos['GG'].disponivel);
    };

    // Função para atualizar estilo do botão
    const updateButtonStyle = (buttonId, disponivel) => {
        const button = document.getElementById(buttonId);
        if (!disponivel) {
            button.classList.add('btn-disabled'); // Adicionar classe para cor cinza
        } else {
            button.classList.remove('btn-disabled'); // Remover classe para cor cinza
        }
    };

    // ID do produto a ser exibido (isso pode ser passado via URL ou outra lógica)
    const productId = 1; // Exemplo: pegar o produto com ID 1

    // Fetch para carregar os dados do JSON
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            const produto = getProductById(data, productId);

            if (produto) {
                // Atualizar a página com as informações do produto
                document.getElementById('cardTitle').textContent = produto.nome;

                // Inicializar com o tamanho P
                updateProductDetails(produto, 'P');

                // Adicionar event listeners aos botões de tamanho
                document.getElementById('buttonP').addEventListener('click', () => updateProductDetails(produto, 'P'));
                document.getElementById('buttonM').addEventListener('click', () => updateProductDetails(produto, 'M'));
                document.getElementById('buttonG').addEventListener('click', () => updateProductDetails(produto, 'G'));
                document.getElementById('buttonGG').addEventListener('click', () => updateProductDetails(produto, 'GG'));

                // Adicionar lógica adicional aqui para lidar com a imagem e outros detalhes do produto, se necessário
                // Por exemplo:
                // document.getElementById('cardImage').src = 'path/to/image.jpg'; // Atualize com o caminho correto da imagem
            } else {
                console.error('Produto não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});
