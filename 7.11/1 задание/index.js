// Массив с книгами библиотеки
const libraryBooks = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "За пропастью во ржи",
    "Властелин колец",
    "Дюна",
    "Отцы и дети"
];

// Получаем элементы DOM
const booksListElement = document.getElementById('booksList');
const addBookButton = document.getElementById('addBookButton');
const searchBookButton = document.getElementById('searchBookButton');

// Функция для отображения списка книг
function showBooksList() {
    // Очищаем текущий список
    booksListElement.innerHTML = '';
    
    // Создаем нумерованный список книг
    libraryBooks.forEach(function(book, index) {
        const listItem = document.createElement('li');
        listItem.textContent = book;
        booksListElement.appendChild(listItem);
    });
}

// Обработчик кнопки "Добавить книгу"
addBookButton.addEventListener('click', function() {
    // Запрашиваем название книги
    const bookTitle = prompt('Введите название книги:');
    
    // Проверяем ввод пользователя
    if (bookTitle === null) {
        return; // Пользователь нажал "Отмена"
    }
    
    if (bookTitle.trim() === '') {
        alert('Название книги не введено!');
        return;
    }
    
    // Добавляем книгу в массив
    libraryBooks.push(bookTitle.trim());
    
    // Обновляем отображение списка
    showBooksList();
});

// Обработчик кнопки "Найти"
searchBookButton.addEventListener('click', function() {
    // Запрашиваем название для поиска
    const searchTitle = prompt('Введите название книги для поиска:');
    
    // Снимаем подсветку со всех книг
    const allBooks = document.querySelectorAll('.books-container li');
    allBooks.forEach(function(book) {
        book.classList.remove('book-highlighted');
    });
    
    // Проверяем ввод пользователя
    if (searchTitle === null) {
        return; // Пользователь нажал "Отмена"
    }
    
    if (searchTitle.trim() === '') {
        alert('Книга не найдена!');
        return;
    }
    
    // Ищем книгу (без учета регистра)
    const searchText = searchTitle.trim().toLowerCase();
    let bookFound = false;
    
    libraryBooks.forEach(function(book, index) {
        if (book.toLowerCase() === searchText) {
            // Нашли книгу - подсвечиваем
            allBooks[index].classList.add('book-highlighted');
            
            // Прокручиваем к найденной книге
            allBooks[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            bookFound = true;
        }
    });
    
    // Если книга не найдена
    if (!bookFound) {
        alert('Книга не найдена!');
    }
});

// Инициализация при загрузке страницы
showBooksList();