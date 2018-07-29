var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

//app.use(http.static(__dirname + "/public"));

app.post("/register", urlencodedParser, function(request, responce) {
	if(!request.body) return responce.sendStatus(400);
	console.log(request.body);
 responce.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, responce){
	responce.sendfile(__dirname + "/public" + "/main.html");
});
//подключение пользователя
io.on('connection', function (socket) {
	console.log("new user connected");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.get("/contact", function(request, responce){

	responce.send("<h1>Контакты</h1>");
});
http.listen(8080);
