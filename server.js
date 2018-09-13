var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sysNick = require("./fun/usersAPI");
var fs = require('fs');


var users_online = 0;
var id = []; //ID подключившихся пользователей
var nicknames = []; //Ники пользователей
var history_msg = []; //История сообщений



app.use(express.static(__dirname + "/public"));
app.get("/", function(request, responce){
	responce.sendfile(__dirname + "/public" + "/index.html");
});
//подключение пользователя
io.on('connection', function (socket) {
	users_online++;
	console.log("new user connected. Users: " + users_online);
	sysNick.addID(socket.id); //Добавляем ID подключившегося в массив
	socket.emit('news', { Server: 'connection complete ' }, users_online, sysNick.getNick(socket.id), sysNick.getNicks(), history_msg); //генерирует событие "news" и отправляет объект подключившемуся клиенту
	socket.broadcast.emit('user connected', sysNick.getNick(socket.id));//генерирует событие о подключении пользователя

	socket.on('send_msg', function (data) {  //Прослушивает событие , которое получает сообщение от клиента
	history_msg.push(data);//Добавляем сообщение в историю
    console.log(data);
	socket.broadcast.emit('new msg', data); //Отправляем новое сообщение пользователям
  });

socket.on('disconnect', function(reason){
	users_online--;
	console.log('User disconnect, reason: ' + reason + '. Users: ' + users_online);
	socket.broadcast.emit('user disconnect', sysNick.getNick(socket.id));
	sysNick.delID(socket.id);
		
	});

socket.on('change_nick', function(newnick){
	var oldnick = sysNick.getNick(socket.id)
	sysNick.addNick(socket.id, newnick);
	socket.broadcast.emit('enemy_change_nick', newnick, oldnick);
});

socket.on('Upload', function(data){ //Необходима проверка пришёл ли весь файл
	fs.writeFile('public/Temp/'+ data['Name'], data['Data'], 'utf8', function(){
		console.log('Получен файл: ' + data['Name']);
	});
	socket.emit('img', data['Name']);
});

});


http.listen(8080);

