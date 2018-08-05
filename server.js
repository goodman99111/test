var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));

app.post("/register", urlencodedParser, function(request, responce) {
	if(!request.body) return responce.sendStatus(400);
	console.log(request.body);
 responce.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, responce){
	responce.sendfile(__dirname + "/public" + "/index.html");
});
//подключение пользователя
io.on('connection', function (socket) {
	console.log("new user connected"); //Уведомление о подключении клиента
  socket.emit('news', { Server: 'connection complete ' }); //генерирует событие "news" и отправляет объект подключившемуся клиенту
	socket.broadcast.emit('user connected', 'new user connected');//генерирует событие о подключении пользователя
  socket.on('my other event', function (data) {  //Прослушивает событие "on", которое получает сообщение от клиента
    console.log(data);
		socket.broadcast.emit('new msg', data);
  });
});

app.get("/contact", function(request, responce){

	responce.send("<h1>Контакты</h1>");
});
http.listen(8080);
