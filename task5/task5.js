const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.getElementById('output');
const userMessage = document.querySelector('.input-message');
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');

let skipEchoMessage; //скрывает сообщение от эхо-сервера

function writeToScreen(message, style) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    if (style === 'user-message') {
        pre.classList.add('user-message')
    } else if (style === 'server-message') {
        pre.classList.add('server-message')
    } else if (style === 'geo') {
        pre.classList.add('geo')
    }
    output.appendChild(pre);
};

let websocket = new WebSocket(wsUri);
websocket.onopen = function (evt) {
    console.log("CONNECTED");
};

websocket.onmessage = function (evt) {
    if (!skipEchoMessage) {
        writeToScreen(`Oтвет сервера:<br> ${evt.data}`, 'server-message');
    }
};

websocket.onerror = function (evt) {
    writeToScreen(`Oтвет сервера:<br> ${evt.data}`, 'server-message');
};

//отправка сообщения
btnSend.addEventListener('click', () => {
    let message = userMessage.value;
    if (!message) {
        alert(`Введите сообщение`)
    } else {
        websocket.send(message);
        writeToScreen(`Вы:<br>${message}`, 'user-message');
        userMessage.value = ''
        skipEchoMessage = false;
    }
});

const error = () => {
    writeToScreen(`Ошибка определения гео-локации`, 'geo');
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    websocket.send(latitude);
    websocket.send(longitude);
    skipEchoMessage = true;
    writeToScreen(`<a  href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target='_blank'>Ваша гео-локация</a>`, 'geo');
};

//Гео-локация
btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen(`Geolocation не поддерживается вашим браузером`, 'geo');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})