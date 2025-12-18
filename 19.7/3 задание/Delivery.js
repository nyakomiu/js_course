export class Delivery {
  constructor(customerName, address, distance) {
    this._customerName = customerName;
    this._address = address;
    this._distance = distance;
    this.element = null;
  }

  get name() {
    return this._customerName;
  }

  set name(value) {
    this._customerName = value;
    this.updateView();
  }

  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;
    this.updateView();
  }

  get distance() {
    return this._distance;
  }

  set distance(value) {
    this._distance = value;
    this.updateView();
  }

  createCardElement() {
    const card = document.createElement('div');
    card.className = 'delivery-card';

    const nameLabel = document.createElement('div');
    nameLabel.className = 'delivery-label';
    nameLabel.textContent = 'Имя';

    const nameValue = document.createElement('div');
    nameValue.className = 'delivery-value';
    nameValue.dataset.field = 'name';
    nameValue.textContent = this._customerName;

    const addressLabel = document.createElement('div');
    addressLabel.className = 'delivery-label';
    addressLabel.textContent = 'Адрес';

    const addressValue = document.createElement('div');
    addressValue.className = 'delivery-value';
    addressValue.dataset.field = 'address';
    addressValue.textContent = this._address;

    const distanceLabel = document.createElement('div');
    distanceLabel.className = 'delivery-label';
    distanceLabel.textContent = 'Расстояние';

    const distanceValue = document.createElement('div');
    distanceValue.className = 'delivery-value';
    distanceValue.dataset.field = 'distance';
    distanceValue.textContent = `${this._distance} км`;

    card.append(
      nameLabel,
      nameValue,
      addressLabel,
      addressValue,
      distanceLabel,
      distanceValue
    );

    this.element = card;
    return card;
  }

  updateView() {
    if (!this.element) return;
    const nameEl = this.element.querySelector('[data-field="name"]');
    const addressEl = this.element.querySelector('[data-field="address"]');
    const distanceEl = this.element.querySelector('[data-field="distance"]');

    if (nameEl) nameEl.textContent = this._customerName;
    if (addressEl) addressEl.textContent = this._address;
    if (distanceEl) distanceEl.textContent = `${this._distance} км`;
  }
}