var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));

app.post("/register", urlencodedParser, function(request, responce) {
	if(!request.body) return responce.sendStatus(400);
	console.log(request.body);
 responce.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, responce){
   
});
app.get("/contact", function(request, responce){

	responce.send("<h1>Контакты</h1>");
});
app.listen(8080);
