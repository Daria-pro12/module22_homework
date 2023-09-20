const btn = document.querySelector('.btn');
const screenSizes = document.querySelector('.screen-sizes');
const userLocation = document.querySelector('.user-location');

// Функция определения размеров экрана
function userScreenSizes() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    screenSizes.textContent = `Размер экрана: ${screenWidth}х${screenHeight} px`;
};

// Функция, выводящая текст об ошибке при определении геолокации
const error = () => {
    userLocation.textContent = 'Информация о местоположении недоступна';
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    userLocation.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
};

btn.addEventListener('click', () => {
    userScreenSizes();
    if (!navigator.geolocation) {
        userLocation.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        userLocation.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});