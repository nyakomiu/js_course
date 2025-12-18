import warehousePage from './pages/warehousePage.js';
import addItemPage from './pages/addItemPage.js';
import { showLoader, hideLoader } from '../utils/loader.js';

const routes = {
    '/': warehousePage,
    '/add': addItemPage
};

export function initRouter() {
    window.addEventListener('popstate', renderRoute);
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigate(e.target.href);
        }
    });
    renderRoute();
}

export function navigate(path) {
    history.pushState(null, null, path);
    renderRoute();
}

async function renderRoute() {
    const app = document.getElementById('app');
    const path = window.location.pathname;
    
    showLoader();
    
    try {
        const pageComponent = routes[path] || routes['/'];
        const page = await pageComponent();
        app.innerHTML = '';
        app.appendChild(page);
    } catch (error) {
        console.error('Ошибка загрузки страницы:', error);
        app.innerHTML = '<h1>Ошибка загрузки страницы</h1>';
    } finally {
        setTimeout(hideLoader, 300); // Небольшая задержка для плавности
    }
}