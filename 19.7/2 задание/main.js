import { EditDelivery } from './Deliveryedit.js';

const deliveryArr = [
  new EditDelivery('Ольга', 'ул. Вымыслов, д. 12', 8, 'delivery'),
  new EditDelivery('Дмитрий', 'ул. Задачная, д. 7', 3, 'delivered'),
  new EditDelivery('Оля', 'ул. Ткачей, д. 43', 11, 'canceled')
];

const listContainer = document.getElementById('deliveries');

deliveryArr.forEach((delivery) => {
  const card = delivery.createCardElement();
  listContainer.appendChild(card);
});

const totalBtn = document.getElementById('total-btn');
const totalText = document.getElementById('total-text');

totalBtn.addEventListener('click', () => {
  const total = deliveryArr
    .filter((d) => d.status !== 'canceled') 
    .reduce((sum, d) => sum + d.distance, 0);

  totalText.textContent = `Общее расстояние: ${total} км`;
});