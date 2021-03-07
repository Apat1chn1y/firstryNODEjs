// Получаем элемент чата
let chat = document.querySelector("#divMessages")
// Получаем строку ввода сообщения
let input = document.querySelector("#inputMessage")
// Получаем кнопку для ввода сообщения
let btnSubmit = document.querySelector("#btnSend")
 
// Подключаем WebSocket
const webSocket = new WebSocket('ws://localhost:3001');
 
// Получаем сообщение от сервера
webSocket.onmessage = function(e) {
    // Парсим полученные данные
    const data = JSON.parse(e.data);
    // Выводим в блог сообщение от сервера
    chat.innerHTML += '<div class="msg">' + data.message + '</div>'
};
 
// Отслеживаем нажатие мыши
btnSubmit.addEventListener("click", () => {
    // Получаем текст из формы для ввода сообщения
    message = input.value;
    // Отправка сообщения через WS
    webSocket.send(JSON.stringify({
        'message': message
    }));
    // Очищаем поле для ввода текста
    input.value = '';
})