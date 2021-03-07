const chalk = require('chalk');
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000
const server = http.createServer((req, res) => {

let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

const ext = path.extname(filePath)

let contentType = 'text/html'
switch (ext){
    case '.css': 
        contentType= 'text/css'
        break
    case '.js': 
        contentType= 'text/javascript'
         break
    default:
        contentType = 'text/html'
}
if (!ext){
    filePath += '.html'
}

fs.readFile(filePath, (err, content)=>{
        if (err){
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data)=>{
                    if (err){
                        res.writeHead(500)
                        res.end('Error')
                    } else{
                        res.writeHead(200), {'Content-Type': 'text/html'}
                        res.end(data)
                    }
            })
        } else {
            res.writeHead(200), {'Content-Type': 'contentType'}
            res.end(content)
        }
    })

}).listen(PORT, () => console.log(chalk.blue('Server has been started on', PORT, 'port...')));

const WebSocket = require('ws');
    // Создаём подключение к WS
    let wsServer = new WebSocket.Server({
        port: 3001
    });
    // Создаём массив для хранения всех подключенных пользователей
    let users = []

    // Проверяем подключение
    wsServer.on('connection', function (ws) {
    //    Делаем подключение пользователя
        let user = {
            connection: ws
            
        }
        // Добавляем нового пользователя ко всем остальным 
        users.push(user)
        // Получаем сообщение от клиента
        ws.on('message', function (message) {
            // Перебираем всех подключенных клиентов
            for (let u of users) {
                // Отправляем им полученное сообщения
                u.connection.send(message)
            }
        })
        // Делаем действие при выходе пользователя из чата
        ws.on('close', function () {
            // Получаем ID этого пользователя
            let id = users.indexOf(user)
            // Убираем этого пользователя
            users.splice(id, 1)
        })
    })
