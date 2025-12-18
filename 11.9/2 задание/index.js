const form = document.getElementById('delivery-form');
const nameInput = document.getElementById('product-name');
const weightInput = document.getElementById('product-weight');
const distanceInput = document.getElementById('delivery-distance');
const tableBody = document.getElementById('table-body');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    resetErrors();

    let isValid = true;

    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameInput, 'error-name');
        isValid = false;
    }

    const weightValue = parseFloat(weightInput.value);
    if (isNaN(weightValue) || weightValue <= 0) {
        showError(weightInput, 'error-weight');
        isValid = false;
    }

    const distanceValue = parseFloat(distanceInput.value);
    if (isNaN(distanceValue) || distanceValue <= 0) {
        showError(distanceInput, 'error-distance');
        isValid = false;
    }

    if (!isValid) return;

    const cost = (weightValue * distanceValue) / 10;

    addTableRow(nameValue, weightValue, distanceValue, cost);

    form.reset();
});

function addTableRow(name, weight, distance, cost) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const weightCell = document.createElement('td');
    weightCell.textContent = weight;

    const distanceCell = document.createElement('td');
    distanceCell.textContent = distance;

    const costCell = document.createElement('td');
    costCell.textContent = cost.toFixed(2) + ' руб'; 

    row.appendChild(nameCell);
    row.appendChild(weightCell);
    row.appendChild(distanceCell);
    row.appendChild(costCell);

    tableBody.appendChild(row);
}

function showError(inputElement, errorId) {
    inputElement.classList.add('error');
    document.getElementById(errorId).style.display = 'inline';
}

function resetErrors() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error'));

    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.style.display = 'none');
}