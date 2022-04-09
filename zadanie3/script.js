const wsUri = "wss://echo-ws-service.herokuapp.com/";


const chatOutput = document.querySelector(".chat-window");
const input = document.querySelector(".input-text");
const sendBtn = document.querySelector(".btn-send");
    
let socket = new WebSocket(wsUri);
        
socket.onmessage = (event) => {
    writeToChat(event.data, true);
}

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
}
    
function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved ? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
}

const locationBtn = document.querySelector('.btn-location');

const error = () => {
    let messageHTML = `<div class="location">Невозможно получить ваше местоположение</div>`;
    chatOutput.innerHTML += messageHTML;
}

const sucess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let messageHTML = `<div class="location">Широта: ${latitude}, Долгота: ${longitude}<br>
    <a href= "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">
    Ваше положение на карте</a></div>`;
    chatOutput.innerHTML += messageHTML;
}

locationBtn.addEventListener ('click', () => {
    if (!navigator.geolocation) {
        let messageHTML = `<div class="location">Ваш браузер не поддерживает геолокацию</div>`;
        chatOutput.innerHTML += messageHTML;
    }   else  {
        navigator.geolocation.getCurrentPosition(sucess, error);
    }
})