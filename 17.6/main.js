import { showLoader, hideLoader } from './modules/utils/loader.js';
import warehousePage from './modules/pages/warehousePage.js';

let currentPage = 'warehouse';

document.addEventListener('DOMContentLoaded', async () => {
    await loadPage(currentPage);
    setupNavigation();
});

async function loadPage(page) {
    showLoader();
    const app = document.getElementById('app');
    
    try {
        let pageContent;
        
        switch(page) {
            case 'warehouse':
                pageContent = await warehousePage();
                break;
            case 'add':
                const { default: addItemPage } = await import('./modules/pages/addItemPage.js');
                pageContent = addItemPage(handleAddSuccess, handleCancel);
                break;
            default:
                pageContent = await warehousePage();
        }
        
        app.innerHTML = '';
        app.appendChild(pageContent);
        currentPage = page;
    } catch (error) {
        console.error('Ошибка загрузки страницы:', error);
        app.innerHTML = `
            <h1>Ошибка загрузки страницы</h1>
            <p>${error.message}</p>
        `;
    } finally {
        hideLoader();
    }
}

function setupNavigation() {
    document.addEventListener('click', (e) => {
        // Кнопка "Добавить запись"
        if (e.target.id === 'add-btn' || e.target.closest('#add-btn')) {
            e.preventDefault();
            loadPage('add');
        }
    });
}

function handleAddSuccess() {
    loadPage('warehouse');
}

function handleCancel() {
    loadPage('warehouse');
}