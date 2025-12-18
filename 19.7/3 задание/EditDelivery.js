import { Delivery } from './Delivery.js';

export class EditDelivery extends Delivery {
  constructor(customerName, address, distance, status = 'delivery') {
    super(customerName, address, distance);
    this._status = status; 
    this.modal = null;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
    this.updateView();
  }

// Статический метод подсчёта 
  static getTotalDistance(deliveries) {
    if (!Array.isArray(deliveries)) return 0;

    return deliveries
      .filter(
        (item) =>
          item instanceof EditDelivery && item.status !== 'canceled'
      )
      .reduce((sum, item) => {
        const dist = Number(item.distance);
        return sum + (Number.isFinite(dist) ? dist : 0);
      }, 0);
  }

  createCardElement() {
    const card = super.createCardElement();

    const editBtn = document.createElement('button');
    editBtn.className = 'delivery-edit-btn';
    editBtn.textContent = 'Изменить';
    card.appendChild(editBtn);

    editBtn.addEventListener('click', () => {
      this.openEditModal();
    });

    this.applyStatusView();
    return card;
  }

  updateView() {
    super.updateView();
    this.applyStatusView();
  }

  applyStatusView() {
    if (!this.element) return;

    this.element.classList.remove(
      'delivery-card--delivery',
      'delivery-card--delivered',
      'delivery-card--canceled'
    );
    this.element.classList.add(`delivery-card--${this._status}`);
  }

  createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'edit-modal-overlay';

    overlay.innerHTML = `
      <div class="edit-modal">
        <button type="button" class="edit-modal-close">&times;</button>
        <h2 class="edit-modal-title">Изменить</h2>
        <form class="edit-modal-form">
          <input class="edit-input edit-input-name" type="text" placeholder="Имя" />
          <input class="edit-input edit-input-address" type="text" placeholder="Адрес" />
          <input class="edit-input edit-input-distance" type="text" placeholder="Расстояние" />
          <select class="edit-input edit-input-status">
            <option value="delivery">Доставляется</option>
            <option value="delivered">Доставлен</option>
            <option value="canceled">Отменён</option>
          </select>
          <button type="submit" class="edit-modal-submit">Сохранить</button>
        </form>
      </div>
    `;

    document.body.appendChild(overlay);
    this.modal = overlay;

    const closeBtn = overlay.querySelector('.edit-modal-close');
    const form = overlay.querySelector('.edit-modal-form');

    closeBtn.addEventListener('click', () => this.closeEditModal());
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) this.closeEditModal();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = form.querySelector('.edit-input-name');
      const addrInput = form.querySelector('.edit-input-address');
      const distInput = form.querySelector('.edit-input-distance');
      const statusSelect = form.querySelector('.edit-input-status');

      const newName = nameInput.value.trim();
      const newAddr = addrInput.value.trim();
      const distStr = distInput.value.trim();
      const dist = Number(distStr);

      if (!newName || !newAddr || !distStr || Number.isNaN(dist) || dist < 0) {
        alert('Проверьте правильность введённых данных');
        return;
      }

      this.name = newName;
      this.address = newAddr;
      this.distance = dist;
      this.status = statusSelect.value;

      this.closeEditModal();
    });
  }

  openEditModal() {
    if (!this.modal) {
      this.createModal();
    }

    const form = this.modal.querySelector('.edit-modal-form');
    form.querySelector('.edit-input-name').value = this.name;
    form.querySelector('.edit-input-address').value = this.address;
    form.querySelector('.edit-input-distance').value = String(this.distance);
    form.querySelector('.edit-input-status').value = this.status;

    this.modal.classList.add('edit-modal-overlay--visible');
  }

  closeEditModal() {
    if (!this.modal) return;
    this.modal.classList.remove('edit-modal-overlay--visible');
  }
}