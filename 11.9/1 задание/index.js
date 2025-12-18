// 1. Получаем элементы DOM
const form = document.getElementById('survey-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ratingInput = document.getElementById('rating');
const ratingValueDisplay = document.getElementById('rating-value');

const resultContainer = document.getElementById('result-container');

// 2. Основная функция обработки формы
form.addEventListener('submit', function(event) {
    // Предотвращаем перезагрузку страницы
    event.preventDefault();

    // Сбрасываем старые ошибки перед новой проверкой
    resetErrors();

    let isValid = true;

    // --- ВАЛИДАЦИЯ ---

    // Проверка имени (не пустое)
    if (nameInput.value.trim() === '') {
        showError('name', 'Пожалуйста, введите имя.');
        isValid = false;
    }

    // Проверка Email (не пустой и формат email)
    const emailValue = emailInput.value.trim();
    // Регулярное выражение для простой проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (emailValue === '') {
        showError('email', 'Email обязателен для заполнения.');
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        showError('email', 'Введите корректный формат Email.');
        isValid = false;
    }

    // Если есть ошибки, прекращаем выполнение функции
    if (!isValid) {
        return;
    }

    // --- СБОР ДАННЫХ ---

    // Получаем пол
    // ищем внутри формы input с именем gender, который сейчас checked
    const genderValue = document.querySelector('input[name="gender"]:checked').value;

    // Получаем интересы
    // собираем все checked чекбоксы
    const interestsCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
    let interestsValues = [];
    interestsCheckboxes.forEach(function(checkbox) {
        interestsValues.push(checkbox.value);
    });
    
    // Превращаем массив интересов в строку
    const interestsString = interestsValues.length > 0 ? interestsValues.join(', ') : 'Нет интересов';

    // Получаем комментарий
    const commentsValue = document.getElementById('comments').value;


    // --- ВЫВОД РЕЗУЛЬТАТОВ ---
    
    document.getElementById('res-name').textContent = nameInput.value;
    document.getElementById('res-email').textContent = emailValue;
    document.getElementById('res-gender').textContent = genderValue;
    document.getElementById('res-rating').textContent = ratingInput.value;
    document.getElementById('res-interests').textContent = interestsString;
    document.getElementById('res-comments').textContent = commentsValue || 'Нет';

    // Делаем блок с результатами видимым
    resultContainer.style.display = 'block';
});

// Вспомогательная функция: Показать ошибку
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + '-error');
    
    input.classList.add('error'); // Добавляем красную рамку
    errorSpan.textContent = message;
    errorSpan.style.display = 'block'; // Показываем текст ошибки
}

// Вспомогательная функция: Сбросить ошибки
function resetErrors() {
    // Убираем класс error у всех инпутов
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));

    // Скрываем все тексты ошибок
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    
    // Скрываем блок результатов (на случай повторной отправки с ошибкой)
    resultContainer.style.display = 'none';
}