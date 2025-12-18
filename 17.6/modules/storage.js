const STORAGE_KEY = 'warehouse_items';

// Начальные данные для тестирования
const INITIAL_DATA = [
    {
        id: '1',
        name: 'Коробка с документами',
        shelf: 'A-1',
        weight: 5.5,
        storageTime: 30
    },
    {
        id: '2',
        name: 'Оборудование',
        shelf: 'B-3',
        weight: 15.2,
        storageTime: 90
    },
    {
        id: '3',
        name: 'Канцелярия',
        shelf: 'C-2',
        weight: 3.1,
        storageTime: 180
    }
];

export function getRecords() {
    const items = localStorage.getItem(STORAGE_KEY);
    console.log('Получаем записи из localStorage:', items);
    
    if (!items) {
        console.log('Нет данных, инициализируем начальными');
        saveRecords(INITIAL_DATA);
        return INITIAL_DATA;
    }
    
    try {
        const parsed = JSON.parse(items);
        console.log('Успешно распарсили:', parsed.length, 'записей');
        return parsed;
    } catch (error) {
        console.error('Ошибка парсинга данных из localStorage:', error);
        return [];
    }
}

export function saveRecords(records) {
    console.log('Сохраняем записи в localStorage:', records);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function addRecord(record) {
    console.log('Добавляем запись:', record);
    const records = getRecords();
    records.push(record);
    saveRecords(records);
    console.log('Запись добавлена, всего записей:', records.length);
    return record;
}

export function deleteRecord(id) {
    console.log('Удаляем запись с id:', id);
    const records = getRecords();
    const filteredRecords = records.filter(record => record.id !== id);
    saveRecords(filteredRecords);
    console.log('После удаления осталось записей:', filteredRecords.length);
    return filteredRecords;
}