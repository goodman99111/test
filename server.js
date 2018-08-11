var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");


var users_online = 0;
var users;

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));
app.get("/", function(request, responce){
	responce.sendfile(__dirname + "/public" + "/index.html");
});
//подключение пользователя
io.on('connection', function (socket) {
	users_online++;
	console.log("new user connected. Users: " + users_online); //Уведомление о подключении клиента
	socket.emit('news', { Server: 'connection complete ' }, users_online); //генерирует событие "news" и отправляет объект подключившемуся клиенту
	//socket.broadcast.emit('userOnline', users_online);
	socket.broadcast.emit('user connected', users_online);//генерирует событие о подключении пользователя
  socket.on('my other event', function (data) {  //Прослушивает событие "on", которое получает сообщение от клиента
    console.log(data);
		socket.broadcast.emit('new msg', data);
  });

	socket.on('disconnect', function(reason){
		users_online--;
		console.log('User disconnect, reason: ' + reason + '. Users: ' + users_online);
		socket.broadcast.emit('user disconnect', users_online);
	});
});
http.listen(8080);
