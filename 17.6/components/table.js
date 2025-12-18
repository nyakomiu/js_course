export function createTable(records) {
    const container = document.createElement('div');
    container.className = 'table-container';
    
    if (records.length === 0) {
        container.innerHTML = '<p class="no-data">Нет записей для отображения</p>';
        return container;
    }
    
    const table = document.createElement('table');
    
    // Заголовок таблицы
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th data-sort="name">Название <span class="sort-icon"></span></th>
            <th data-sort="shelf">Полка <span class="sort-icon"></span></th>
            <th data-sort="weight">Вес (кг) <span class="sort-icon"></span></th>
            <th data-sort="storageTime">Время хранения (дней) <span class="sort-icon"></span></th>
            <th>Действия</th>
        </tr>
    `;
    
    // Тело таблицы
    const tbody = document.createElement('tbody');
    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.shelf}</td>
            <td>${record.weight.toFixed(2)}</td>
            <td>${record.storageTime}</td>
            <td>
                <button class="button red delete-btn" data-id="${record.id}">Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    
    // Добавляем обработчики сортировки
    let currentSort = { field: null, direction: 'asc' };
    
    thead.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const field = th.dataset.sort;
            sortTable(field);
        });
    });
    
    function sortTable(field) {
        // Определяем направление сортировки
        if (currentSort.field === field) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.field = field;
            currentSort.direction = 'asc';
        }
        
        // Сортируем записи
        const sortedRecords = [...records].sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];
            
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (aValue < bValue) return currentSort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        // Обновляем таблицу
        updateTable(sortedRecords);
        updateSortIcons();
    }
    
    function updateTable(sortedRecords) {
        tbody.innerHTML = '';
        sortedRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.shelf}</td>
                <td>${record.weight.toFixed(2)}</td>
                <td>${record.storageTime}</td>
                <td>
                    <button class="button red delete-btn" data-id="${record.id}">Удалить</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    function updateSortIcons() {
        // Сбрасываем все иконки
        thead.querySelectorAll('th').forEach(th => {
            th.classList.remove('asc', 'desc');
        });
        
        // Устанавливаем иконку для текущего поля сортировки
        if (currentSort.field) {
            const currentTh = thead.querySelector(`th[data-sort="${currentSort.field}"]`);
            if (currentTh) {
                currentTh.classList.add(currentSort.direction);
            }
        }
    }
    
    return container;
}