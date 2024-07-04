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

                    // Define o texto e link do botão com base na disponibilidade do produto
                    let buttonText, buttonHref;
                    if (!produto.disp) {
                        productCard.classList.add('indisponivel');

                        const phoneNumber = '555191618973';
                        const message = `Olá, tenho interesse em encomendar a peça ${produto.nome}`;
                        const EncomendaUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);

                        buttonText = 'Encomendar';
                        buttonId = "EncomendaMsg";
                        buttonHref = EncomendaUrl;
                        buttonClass = 'btn btn-primary btn-encomendar'; // Adicionei uma classe específica para "Encomendar"
                    } else {
                        buttonText = 'Comprar';
                        buttonHref = `base_buy.html?product_id=${produto.id}`;
                        buttonClass = 'btn btn-primary'; // Classe padrão para "Comprar"
                    }
                    
                    productCard.innerHTML = `
                        <img src="imgs/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">${produto.disp ? 'Disponível' : 'Indisponível'}</p>
                            <a href="${buttonHref}" class="${buttonClass}">${buttonText}</a>
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

                    document.getElementById('whatsappButton').addEventListener('click', function() {
                        var phoneNumber = '555191618973'; // Número de telefone no formato internacional
                        var message = `Olá, tenho interesse na peça ${produto.nome} no tamanho ${tamanhoMsg}!`; // Mensagem personalizada
                        var url = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
                        
                        window.open(url, '_blank');
                    });
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
    tamanhoMsg = tamanhoSelecionado
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

document.addEventListener("DOMContentLoaded", function() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            const maisProdutosContainer = document.getElementById('mais-produtos');
            if (maisProdutosContainer) {
                // Seleciona aleatoriamente 4 produtos
                const randomProducts = getRandomProducts(data.produtos, 4);

                randomProducts.forEach(produto => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('card');

                    // Adiciona a classe 'indisponivel' se disp for false
                    if (!produto.disp) {
                        productCard.classList.add('indisponivel');
                    }

                    // Define o texto e link do botão com base na disponibilidade do produto
                    let buttonText, buttonHref;
                    if (!produto.disp) {
                        productCard.classList.add('indisponivel');

                        const phoneNumber = '555191618973';
                        const message = `Olá, tenho interesse em encomendar a peça ${produto.nome}`;
                        const EncomendaUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);

                        buttonText = 'Encomendar';
                        buttonId = "EncomendaMsg";
                        buttonHref = EncomendaUrl;
                        buttonClass = 'btn btn-primary btn-encomendar'; // Adicionei uma classe específica para "Encomendar"
                    } else {
                        buttonText = 'Comprar';
                        buttonHref = `base_buy.html?product_id=${produto.id}`;
                        buttonClass = 'btn btn-primary'; // Classe padrão para "Comprar"
                    }

                    productCard.innerHTML = `
                        <img src="imgs/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">${produto.disp ? 'Disponível' : 'Indisponível'}</p>
                            <a href="base_buy.html?product_id=${produto.id}" class="btn btn-primary">${produto.disp ? 'Comprar' : 'Encomendar'}</a>
                        </div>
                    `;

                    maisProdutosContainer.appendChild(productCard);
                });
            } else {
                console.error('Container não encontrado para mais produtos.');
            }
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});

// Função para selecionar aleatoriamente um número específico de produtos
function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// pesquisa no index

function redirectToSearchPage(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchbar').value;
    if (searchQuery) {
        window.location.href = `search_results.html?query=${encodeURIComponent(searchQuery)}`;
    }
}

