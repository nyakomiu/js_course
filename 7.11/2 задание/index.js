const studentsHeights = [164, 157, 160, 143, 170];
let minimumHeightFilter = null;

const heightsListElement = document.getElementById('heightsList');
const addHeightButton = document.getElementById('addHeightButton');
const filterHeightButton = document.getElementById('filterHeightButton');
const studentsCountElement = document.getElementById('studentsCount');
const filterInfoElement = document.createElement('div');
filterInfoElement.className = 'filter-active';
document.querySelector('.heights-section').appendChild(filterInfoElement);

function updateStudentsCount() {
    studentsCountElement.textContent = studentsHeights.length;
}

function displayHeightsList() {
    heightsListElement.innerHTML = '';
    heightsListElement.style.counterReset = 'height-counter';

    let heightsToShow = studentsHeights;
    if (minimumHeightFilter !== null) {
        heightsToShow = studentsHeights.filter(height => height >= minimumHeightFilter);
        filterInfoElement.textContent = `Показаны ученики с ростом от ${minimumHeightFilter} см`;
        filterInfoElement.style.display = 'block';
    } else {
        filterInfoElement.style.display = 'none';
    }

    heightsToShow.forEach(function(height) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${height} см</span>`;
        heightsListElement.appendChild(listItem);
    });
    
    updateStudentsCount();
}

addHeightButton.addEventListener('click', function() {
    const heightInput = prompt('Введите рост ученика (в сантиметрах):');
    if (heightInput === null) {
        return; 
    }
    
    if (heightInput.trim() === '') {
        alert('Рост не введён!');
        return;
    }

    const heightValue = parseInt(heightInput.trim());
    
    if (isNaN(heightValue) || heightValue <= 0 || heightValue > 300) {
        alert('Пожалуйста, введите корректное значение роста (от 1 до 300 см)');
        return;
    }
    studentsHeights.push(heightValue);
    displayHeightsList();
});

filterHeightButton.addEventListener('click', function() {
    const filterInput = prompt('Введите минимальный рост для фильтрации (в сантиметрах):');
    if (filterInput === null) {
        return; 
    }
    
    if (filterInput.trim() === '') {
        minimumHeightFilter = null;
        displayHeightsList();
        return;
    }
    const filterValue = parseInt(filterInput.trim());
    
    if (isNaN(filterValue) || filterValue <= 0) {
        alert('Пожалуйста, введите корректное число для фильтрации');
        return;
    }
    minimumHeightFilter = filterValue;
    displayHeightsList();
});

displayHeightsList();