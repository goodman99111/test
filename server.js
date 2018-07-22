var express = require("express");
//создаём объект приложения
var app = express();
//определяем обработчик для маршрута "/"
app.get("/", function(request, responce){

  //отправляет ответ
  responce.send("<h1>Andrew, сосамбе</h1");
});

app.get("/about", function(request, responce){

  responce.send("<h1>About site</h1>");
});

app.get("/contact", function(request, responce){

  responce.send("<h1>Contact</h1>");
});
//Начинаем прослушивание подключения на 3000 порту
app.listen(8080);
