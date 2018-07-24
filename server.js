var express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(request, responce){
	
	responce.send("<h1>Main page</h1>");
});
app.get("/contact", function(request, responce){
	
	responce.send("<h1>Контакты</h1>");
});
app.listen(8080);

