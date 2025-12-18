function progress(barId, timeId, timeInSeconds) {
    const bar = document.getElementById(barId);
    const timeLabel = document.getElementById(timeId);
    
    if (!bar) return;
    
    const duration = Math.max(timeInSeconds, 2);

    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(0)';
    if (timeLabel) timeLabel.textContent = '0 с';

    setTimeout(() => {
        bar.style.transition = `transform ${duration}s linear`;
        bar.style.transform = 'scaleX(1)';
    }, 10);

    if (timeLabel) {
        let elapsed = 0;
        const intervalId = setInterval(() => {
            elapsed += 1;
            if (elapsed <= duration) {
                timeLabel.textContent = `${elapsed} с`;
            }
            if (elapsed >= duration) {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    return new Promise(resolve => {
        setTimeout(resolve, duration * 1000);
    });
}

//ФУНКЦИИ, ИМИТИРУЮЩИЕ ЗАПРОСЫ 

// Мок-функция для загрузки кошек
function loadCatImages() {
    return new Promise(resolve => {
        // Случайное время от 2 до 5 секунд 
        const time = Math.floor(Math.random() * 3) + 2;
        console.log(`Загрузка кошек: ${time} секунд`);
        
        // Имитация сетевой задержки
        setTimeout(() => {
            resolve({
                images: ['cat1.jpg', 'cat2.jpg', 'cat3.jpg'],
                time: time
            });
        }, time * 1000);
    });
}

// Мок-функция для загрузки собак
function loadDogImages() {
    return new Promise(resolve => {
        // Случайное время от 2 до 5 секунд 
        const time = Math.floor(Math.random() * 3) + 2;
        console.log(`Загрузка собак: ${time} секунд`);
        
        // Имитация сетевой задержки
        setTimeout(() => {
            resolve({
                images: ['dog1.jpg', 'dog2.jpg', 'dog3.jpg'],
                time: time
            });
        }, time * 1000);
    });
}

//Функция для отображения изображений
function showImages(images, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Изображение';
        
        // Обработка ошибок загрузки
        img.onerror = function() {
            console.error(`Ошибка загрузки: ${src}`);
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = `<div style="color: #666; text-align: center; padding: 10px;">
                                <div>Не удалось загрузить</div>
                                <div style="font-size: 12px;">${src}</div>
                              </div>`;
        };
        
        container.appendChild(img);
    });
}

// ГЛАВНАЯ ФУНКЦИЯ 
async function loadAllImages() {
    console.log('=== НАЧАЛО ЗАГРУЗКИ ИЗОБРАЖЕНИЙ ===');
    
    // ШАГ 1: Загружаем изображения кошек
    console.log('1. Запуск загрузки кошек...');
    const catsData = await loadCatImages(); // Функция имитации запроса
    
    // Прогресс-бар для кошек 
    console.log(`2. Запуск Progress Bar для кошек (${catsData.time} сек)`);
    await progress('cats-bar', 'cats-time', catsData.time);
    
    // Изображения появляются ТОЛЬКО ПОСЛЕ завершения загрузки
    console.log('3. Показ изображений кошек');
    showImages(catsData.images, 'cats-row');
    console.log('✓ Кошки загружены\n');
    
    // ШАГ 2: Загружаем изображения собак
    console.log('4. Запуск загрузки собак...');
    const dogsData = await loadDogImages(); // Функция имитации запроса
    
    // Прогресс-бар для собак 
    console.log(`5. Запуск Progress Bar для собак (${dogsData.time} сек)`);
    await progress('dogs-bar', 'dogs-time', dogsData.time);
    
    // Изображения появляются ТОЛЬКО ПОСЛЕ завершения загрузки
    console.log('6. Показ изображений собак');
    showImages(dogsData.images, 'dogs-row');
    console.log('✓ Собаки загружены\n');
    
    console.log('=== ВСЕ ИЗОБРАЖЕНИЯ УСПЕШНО ЗАГРУЖЕНЫ ===');
    console.log(`Время загрузки: кошки ${catsData.time}с, собаки ${dogsData.time}с`);
}

document.addEventListener('DOMContentLoaded', loadAllImages);