import { getRecords, deleteRecord } from '../storage.js';

export default function warehousePage() {
    const container = document.createElement('div');
    
    console.log('Создаем страницу склада...');
    const records = getRecords();
    console.log('Получено записей:', records.length);
    
    container.innerHTML = `
        <h1>Склад</h1>
        <div class="header-actions">
            <button class="button" id="add-btn">Добавить запись</button>
        </div>
    `;
    
    if (records.length === 0) {
        container.innerHTML += '<p class="no-data">Нет записей для отображения</p>';
    } else {
        container.innerHTML += generateTable(records);
    }
    
    // Добавляем обработчик для кнопки добавления
    const addBtn = container.querySelector('#add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            console.log('Нажата кнопка "Добавить запись"');
        });
    }
    
    // Добавляем обработчики для кнопок удаления
    setTimeout(() => {
        setupDeleteListeners(container);
    }, 100);
    
    return container;
}

function generateTable(records) {
    console.log('Генерируем таблицу для', records.length, 'записей');
    
    return `
        <table class="warehouse-table">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Полка</th>
                    <th>Вес (кг)</th>
                    <th>Время хранения (дней)</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${records.map(record => `
                    <tr>
                        <td>${escapeHtml(record.name)}</td>
                        <td>${escapeHtml(record.shelf)}</td>
                        <td>${record.weight.toFixed(2)}</td>
                        <td>${record.storageTime}</td>
                        <td>
                            <button class="button red delete-btn" data-id="${record.id}">
                                Удалить
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function setupDeleteListeners(container) {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            console.log('Попытка удаления записи с id:', id);
            
            if (confirm('Вы уверены, что хотите удалить эту запись?')) {
                deleteRecord(id);
                // Обновляем страницу
                window.location.reload(); // Простой способ обновить данные
            }
        }
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}