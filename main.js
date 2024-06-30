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