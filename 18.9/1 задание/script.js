const catImages = ['cat1.jpg', 'cat2.jpg', 'cat3.jpg'];
const dogImages = ['dog1.jpg', 'dog2.jpg', 'dog3.jpg'];

function loadCatImages() {
    return new Promise((resolve) => {
        const delay = Math.random() * 3000 + 2000; // 2-5 секунд
        
        setTimeout(() => {
            console.log(`Коты загружены за ${Math.round(delay)}ms`);
            resolve(catImages);
        }, delay);
    });
}

function loadDogImages() {
    return new Promise((resolve) => {
        const delay = Math.random() * 3000 + 2000; // 2-5 секунд
        
        setTimeout(() => {
            console.log(`Собаки загружены за ${Math.round(delay)}ms`);
            resolve(dogImages);
        }, delay);
    });
}

function updateProgress(percent) {
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = `${percent}%`;
}

function showImages(images, containerId) {
    const container = document.getElementById(containerId);
    
    images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = "Image";
        container.appendChild(img);
    });
}

async function loadAllImages() {
    console.log('Начинаем загрузку изображений...');
    
    // Сбрасываем progress bar
    updateProgress(0);
    
    // Запускаем оба промиса
    const catsPromise = loadCatImages();
    const dogsPromise = loadDogImages();
    
    // Обновляем прогресс
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += 2;
            updateProgress(progress);
        }
    }, 100);
    
    try {
        // Ждем оба промиса
        const [cats, dogs] = await Promise.all([catsPromise, dogsPromise]);
        
        // Завершаем прогресс
        clearInterval(progressInterval);
        updateProgress(100);
        
        // Определяем порядок загрузки
        // Promise.all сохраняет порядок, но мы хотим отображать в порядке загрузки
        // Для этого просто показываем оба массива
        showImages(cats, 'catsContainer');
        showImages(dogs, 'dogsContainer');
        
        console.log('Все изображения загружены!');
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        updateProgress(0);
    }
}

document.addEventListener('DOMContentLoaded', loadAllImages);