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

document.addEventListener("DOMContentLoaded", function() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            data.produtos.forEach(produto => {
                let tipoContainer;
                switch (produto.tipo) {
                    case 'camiseta':
                        tipoContainer = 'camisas-container';
                        break;
                    case 'conjunto':
                        tipoContainer = 'conjuntos-container';
                        break;
                    case 'blusa':
                        tipoContainer = 'blusas-container';
                        break;
                    default:
                        console.error('Tipo de produto desconhecido:', produto.tipo);
                        return;
                }
                const productsContainer = document.getElementById(tipoContainer);
                if (productsContainer) {
                    const productCard = document.createElement('div');
                    productCard.classList.add('card');
                    
                    // Adiciona a classe 'indisponivel' se disp for false
                    if (!produto.disp) {
                        productCard.classList.add('indisponivel');
                    }

                    productCard.innerHTML = `
                        <img src="imgs/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">Disponível</p>
                            <a href="base_buy.html?product_id=${produto.id}" class="btn btn-primary">Comprar</a>
                        </div>
                    `;
                    productsContainer.appendChild(productCard);
                } else {
                    console.error('Container não encontrado para tipo:', produto.tipo);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('product_id'));

    if (productId) {
        fetch('produtos.json')
            .then(response => response.json())
            .then(data => {
                const produto = data.produtos.find(produto => produto.id === productId);

                if (produto) {
                    // Atualizar a página com as informações do produto
                    document.getElementById('cardTitle').textContent = produto.nome;
                    document.getElementById('cardImage').src = `imgs/${produto.imagem}`;

                    // Inicializar com o tamanho P
                    updateProductDetails(produto, 'P');

                    // Adicionar event listeners aos botões de tamanho
                    document.getElementById('buttonP').addEventListener('click', () => updateProductDetails(produto, 'P'));
                    document.getElementById('buttonM').addEventListener('click', () => updateProductDetails(produto, 'M'));
                    document.getElementById('buttonG').addEventListener('click', () => updateProductDetails(produto, 'G'));
                    document.getElementById('buttonGG').addEventListener('click', () => updateProductDetails(produto, 'GG'));

                    // Adicionar lógica adicional aqui para lidar com a imagem e outros detalhes do produto, se necessário
                } else {
                    console.error('Produto não encontrado.');
                }
            })
            .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
    } else {
        console.error('Nenhum ID de produto fornecido.');
    }
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
