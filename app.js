var express = require("express");
//создаём объект приложени
var app = express();
//определяем обработчик для маршрута "/"
app.get("/", function(request, responce){

  //отправляет ответ
  responce.send("<h1>Hello</h1");
});
//Начинаем прослушивание подключения на 3000 порту
app.listen(3000);
