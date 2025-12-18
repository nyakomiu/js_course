const shoppingItems = [
    "Арбуз",
    "Книга",
    "Кофе",
    "Макароны",
    "Молоко",
    "Сахар",
    "Яблоки"
];

const productsListElement = document.getElementById('productsList');
const addProductButton = document.getElementById('addProductButton');
const productsCountElement = document.getElementById('productsCount');

function sortProductsAlphabetically() {
    shoppingItems.sort(function(a, b) {
        return a.localeCompare(b);
    });
}

function updateProductsCount() {
    productsCountElement.textContent = shoppingItems.length;
}

function showProductsList() {
    productsListElement.innerHTML = '';
    
    productsListElement.style.counterReset = 'product-counter';
    
    sortProductsAlphabetically();
    
    shoppingItems.forEach(function(product) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${product}</span>`;
        productsListElement.appendChild(listItem);
    });
    
    updateProductsCount();
}

addProductButton.addEventListener('click', function() {
    const productName = prompt('Введите название товара:');
    
    if (productName === null) {
        return;
    }
    
    if (productName.trim() === '') {
        alert('Название товара не введено!');
        return;
    }
    
    shoppingItems.push(productName.trim());
    
    showProductsList();
});

showProductsList();