import { addRecord } from '../storage.js';

export default function addItemPage(onSuccess, onCancel) {
    const pageContainer = document.createElement('div');
    
    pageContainer.innerHTML = `
        <h1>Добавить запись</h1>
        <form id="add-item-form">
            <div class="form-group">
                <label for="name">Название:</label>
                <input type="text" id="name" name="name" required>
                <div class="error-message" id="name-error"></div>
            </div>
            <div class="form-group">
                <label for="shelf">Полка:</label>
                <input type="text" id="shelf" name="shelf" required>
                <div class="error-message" id="shelf-error"></div>
            </div>
            <div class="form-group">
                <label for="weight">Вес (кг):</label>
                <input type="number" id="weight" name="weight" step="0.01" min="0.01" required>
                <div class="error-message" id="weight-error"></div>
            </div>
            <div class="form-group">
                <label for="storageTime">Время хранения (дней):</label>
                <input type="number" id="storageTime" name="storageTime" min="1" required>
                <div class="error-message" id="storageTime-error"></div>
            </div>
            <div class="form-actions">
                <button type="submit" class="button">Добавить</button>
                <button type="button" class="button red" id="cancel-btn">Отмена</button>
            </div>
        </form>
    `;

    const form = pageContainer.querySelector('#add-item-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Получаем данные формы
        const name = form.elements.name.value.trim();
        const shelf = form.elements.shelf.value.trim();
        const weight = form.elements.weight.value;
        const storageTime = form.elements.storageTime.value;
        
        // Валидация
        let isValid = true;
        const errors = {};
        
        if (!name) {
            errors.name = 'Введите название';
            isValid = false;
        }
        
        if (!shelf) {
            errors.shelf = 'Введите номер полки';
            isValid = false;
        }
        
        if (!weight || parseFloat(weight) <= 0) {
            errors.weight = 'Введите корректный вес (больше 0)';
            isValid = false;
        }
        
        if (!storageTime || parseInt(storageTime) < 1) {
            errors.storageTime = 'Время хранения должно быть не менее 1 дня';
            isValid = false;
        }
        
        // Показываем ошибки
        Object.keys(errors).forEach(key => {
            const errorElement = pageContainer.querySelector(`#${key}-error`);
            if (errorElement) {
                errorElement.textContent = errors[key];
            }
        });
        
        // Если нет ошибок - сохраняем
        if (isValid) {
            const newRecord = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: name,
                shelf: shelf,
                weight: parseFloat(weight),
                storageTime: parseInt(storageTime, 10)
            };
            
            console.log('Добавляем запись:', newRecord);
            
            try {
                addRecord(newRecord);
                console.log('Запись успешно добавлена');
                
                // Очищаем форму
                form.reset();
                
                // Вызываем колбэк успеха
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error('Ошибка при добавлении записи:', error);
                alert('Произошла ошибка при сохранении записи');
            }
        }
    });
    
    // Обработчик кнопки отмены
    const cancelBtn = pageContainer.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', () => {
        if (onCancel) {
            onCancel();
        }
    });
    
    return pageContainer;
}