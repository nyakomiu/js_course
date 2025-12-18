const API_URL = "https://sb-film.skillbox.cc/films";
const EMAIL = "ovikdevil@gmail.com";

let currentFilters = {
  title: "",
  genre: "",
  releaseYear: "",
  isWatched: ""
};

function showError(message) {
  const errorDiv = document.getElementById("error-message");
  const successDiv = document.getElementById("success-message");
  if (successDiv) successDiv.style.display = "none";
  if (!errorDiv) return;
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

function showSuccess(message) {
  const errorDiv = document.getElementById("error-message");
  const successDiv = document.getElementById("success-message");
  if (errorDiv) errorDiv.style.display = "none";
  if (!successDiv) return;
  successDiv.textContent = message;
  successDiv.style.display = "block";
  setTimeout(() => {
    successDiv.style.display = "none";
  }, 3000);
}

function validateForm(title, genre, releaseYear) {
  if (!title || title.trim() === "") {
    showError("Пожалуйста, введите название фильма");
    return false;
  }
  if (!genre || genre.trim() === "") {
    showError("Пожалуйста, введите жанр фильма");
    return false;
  }
  if (!releaseYear || releaseYear === "") {
    showError("Пожалуйста, введите год выпуска фильма");
    return false;
  }
  const year = parseInt(releaseYear, 10);
  if (isNaN(year) || year < 1900 || year > 2100) {
    showError("Год выпуска должен быть между 1900 и 2100");
    return false;
  }
  return true;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;
  const isWatched = document.getElementById("isWatched").checked;

  if (!validateForm(title, genre, releaseYear)) {
    return;
  }

  const film = {
    title: title.trim(),
    genre: genre.trim(),
    releaseYear: parseInt(releaseYear, 10),
    isWatched: isWatched
  };

  addFilm(film);
}

async function addFilm(film) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: EMAIL
      },
      body: JSON.stringify(film)
    });

    if (!response.ok) {
      let errorText = "Ошибка при добавлении фильма";
      try {
        const data = await response.json();
        if (data && data.error) errorText = data.error;
      } catch (e) {}
      throw new Error(errorText);
    }

    showSuccess("Фильм успешно добавлен");
    const form = document.getElementById("film-form");
    if (form) form.reset();
    renderTable();
  } catch (error) {
    showError(error.message);
    console.error(error);
  }
}

async function renderTable() {
  try {
    let url = API_URL;
    const params = new URLSearchParams();

    if (currentFilters.title) {
      params.append("title", currentFilters.title);
    }
    if (currentFilters.genre) {
      params.append("genre", currentFilters.genre);
    }
    if (currentFilters.releaseYear) {
      params.append("releaseYear", currentFilters.releaseYear);
    }
    if (currentFilters.isWatched !== "") {
      params.append("isWatched", currentFilters.isWatched);
    }

    const query = params.toString();
    if (query) {
      url += "?" + query;
    }

    const response = await fetch(url, {
      headers: {
        email: EMAIL
      }
    });

    if (!response.ok) {
      throw new Error("Ошибка при получении списка фильмов");
    }

    const films = await response.json();
    const filmTableBody = document.getElementById("film-tbody");
    if (!filmTableBody) return;

    filmTableBody.innerHTML = "";

    if (!films || films.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.style.textAlign = "center";
      cell.style.padding = "30px";
      cell.style.color = "#666";
      cell.textContent = "Фильмы не найдены. Добавьте новый фильм или измените фильтры.";
      row.appendChild(cell);
      filmTableBody.appendChild(row);
      return;
    }

    films.forEach((film) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${film.title}</td>
        <td>${film.genre}</td>
        <td>${film.releaseYear}</td>
        <td>${film.isWatched ? "Да" : "Нет"}</td>
        <td>
          <button class="btn-delete" onclick="deleteFilm('${film.id}')">Удалить</button>
        </td>
      `;
      filmTableBody.appendChild(row);
    });
  } catch (error) {
    showError(error.message);
    console.error(error);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

async function deleteFilm(id) {
  if (!confirm("Вы уверены, что хотите удалить этот фильм?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        email: EMAIL
      }
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении фильма");
    }

    showSuccess("Фильм успешно удалён");
    renderTable();
  } catch (error) {
    showError(error.message);
    console.error(error);
  }
}

async function deleteAllFilms() {
  if (!confirm("Вы уверены, что хотите удалить все фильмы? Это действие нельзя отменить.")) {
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        email: EMAIL
      }
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении всех фильмов");
    }

    showSuccess("Все фильмы успешно удалены");
    renderTable();
  } catch (error) {
    showError(error.message);
    console.error(error);
  }
}

function applyFilters() {
  const titleInput = document.getElementById("filter-title");
  const genreInput = document.getElementById("filter-genre");
  const yearInput = document.getElementById("filter-year");
  const watchedSelect = document.getElementById("filter-watched");

  currentFilters.title = titleInput ? titleInput.value.trim() : "";
  currentFilters.genre = genreInput ? genreInput.value.trim() : "";
  currentFilters.releaseYear = yearInput ? yearInput.value.trim() : "";
  currentFilters.isWatched = watchedSelect ? watchedSelect.value : "";

  renderTable();
}

let filterTimeout = null;

function debounceFilter() {
  if (filterTimeout) {
    clearTimeout(filterTimeout);
  }
  filterTimeout = setTimeout(() => {
    applyFilters();
  }, 300);
}

document.getElementById("film-form").addEventListener("submit", handleFormSubmit);
document.getElementById("delete-all").addEventListener("click", deleteAllFilms);

const filterTitle = document.getElementById("filter-title");
const filterGenre = document.getElementById("filter-genre");
const filterYear = document.getElementById("filter-year");
const filterWatched = document.getElementById("filter-watched");

if (filterTitle) filterTitle.addEventListener("input", debounceFilter);
if (filterGenre) filterGenre.addEventListener("input", debounceFilter);
if (filterYear) filterYear.addEventListener("input", debounceFilter);
if (filterWatched) filterWatched.addEventListener("change", applyFilters);

renderTable();