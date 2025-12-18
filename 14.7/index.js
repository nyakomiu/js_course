const form = document.getElementById('filmForm');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const isWatchedInput = document.getElementById('isWatched');

const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const tableBody = document.querySelector('#filmsTable tbody');
const sortSelect = document.getElementById('sortSelect');
const sortBtn = document.getElementById('sortBtn');

let editingId = null;
let films = JSON.parse(localStorage.getItem('films')) || [];

const saveToLocalStorage = () => {
    localStorage.setItem('films', JSON.stringify(films));
};

const renderTable = () => {
    tableBody.innerHTML = '';

    films.forEach(film => {
        const row = document.createElement('tr');
        // Кнопки уже имеют класс btn-small из CSS
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.year}</td>
            <td>${film.isWatched ? 'Да' : 'Нет'}</td>
            <td>
                <button class="btn-small" onclick="editFilm(${film.id})">Редактировать</button>
                <button class="btn-small" onclick="deleteFilm(${film.id})">Удалить</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const genre = genreInput.value.trim();
    const year = yearInput.value.trim();
    const isWatched = isWatchedInput.checked;

    if (!title || !genre || !year) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    if (editingId) {
        const filmIndex = films.findIndex(f => f.id === editingId);
        if (filmIndex !== -1) {
            films[filmIndex] = { id: editingId, title, genre, year, isWatched };
        }
        resetFormState();
    } else {
        const newFilm = { id: Date.now(), title, genre, year, isWatched };
        films.push(newFilm);
    }
    saveToLocalStorage();
    renderTable();
    form.reset();
};

const resetFormState = () => {
    editingId = null;
    submitBtn.textContent = 'Добавить';
    cancelEditBtn.classList.add('hidden');
    form.reset();
};

const sortFilms = () => {
    const criteria = sortSelect.value;
    films.sort((a, b) => {
        if (criteria === 'year') return a.year - b.year;
        return a[criteria].localeCompare(b[criteria]);
    });
    saveToLocalStorage();
    renderTable();
};

window.deleteFilm = (id) => {
    if (!confirm('Удалить фильм?')) return;
    films = films.filter(film => film.id !== id);
    if (editingId === id) resetFormState();
    saveToLocalStorage();
    renderTable();
};

window.editFilm = (id) => {
    const film = films.find(f => f.id === id);
    if (!film) return;
    titleInput.value = film.title;
    genreInput.value = film.genre;
    yearInput.value = film.year;
    isWatchedInput.checked = film.isWatched;
    editingId = id;
    submitBtn.textContent = 'Обновить';
    cancelEditBtn.classList.remove('hidden');
};

form.addEventListener('submit', handleFormSubmit);
cancelEditBtn.addEventListener('click', (e) => { e.preventDefault(); resetFormState(); });
sortBtn.addEventListener('click', sortFilms);

renderTable();