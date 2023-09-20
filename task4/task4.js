const btn = document.querySelector('.btn');
const timezone = document.querySelector('.timezone');
const dateAndTime = document.querySelector('.date-time');

// Функция, выводящая текст об ошибке 
const error = () => {
    timezone.textContent = 'Информация о временной зоне не доступна';
    dateAndTime.textContent = 'Информация о местных дате и времени не доступна';
};

// Функция, срабатывающая при успехе
const success = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const data = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then(response => response.json());

    timezone.textContent = data.timezone;
    dateAndTime.textContent = data.date_time_txt;

};

btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        timezone.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        timezone.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});