const prices = [100, 500, 250, 750, 300];
const listElement = document.getElementById('price-list');
const sortAscBtn = document.getElementById('sort-asc-btn');
const sortDescBtn = document.getElementById('sort-desc-btn');

function renderPrices() {
    listElement.innerHTML = '';
    prices.forEach(function(price) {
        const newLi = document.createElement('li');
        newLi.textContent = price;
        listElement.appendChild(newLi);
    });
}

function sortPricesAsc() {
    prices.sort(function(a, b) {
        return a - b;
    });
    renderPrices();
}

function sortPricesDesc() {
    prices.sort(function(a, b) {
        return b - a;
    });
    renderPrices();
}

sortAscBtn.addEventListener('click', sortPricesAsc);
sortDescBtn.addEventListener('click', sortPricesDesc);
renderPrices();