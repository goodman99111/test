var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");
var sysNick = require("./fun/nicknameID");


var users_online = 0;
var id = []; //ID подключившихся пользователей
var nicknames = []; //Ники пользователей
var number = 0;


var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));
app.get("/", function(request, responce){
	responce.sendfile(__dirname + "/public" + "/index.html");
});
//подключение пользователя
io.on('connection', function (socket) {
	users_online++;
	console.log("new user connected. Users: " + users_online);
	sysNick.addID(id, nicknames, socket.id); //Добавляем ID подключившегося в массив
	socket.emit('news', { Server: 'connection complete ' }, users_online, sysNick.getNick(id, nicknames, socket.id), nicknames); //генерирует событие "news" и отправляет объект подключившемуся клиенту
	socket.broadcast.emit('user connected', sysNick.getNick(id, nicknames, socket.id));//генерирует событие о подключении пользователя
  socket.on('my other event', function (data) {  //Прослушивает событие , которое получает сообщение от клиента
    console.log(data);
		socket.broadcast.emit('new msg', data);
  });

socket.on('disconnect', function(reason){
		users_online--;
		console.log('User disconnect, reason: ' + reason + '. Users: ' + users_online);
		socket.broadcast.emit('user disconnect', sysNick.getNick(id, nicknames, socket.id));
		sysNick.delID(id, nicknames, socket.id);
	});
});
http.listen(8080);
