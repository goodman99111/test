var express = require("express");
//создаём объект приложения
var app = express();
const PORT = process.env.PORT || 80
//определяем обработчик для маршрута "/"
app.get("/", function(request, responce){

  //отправляет ответ
  responce.send("<h1>Hello</h1");
});

app.get("/about", function(request, responce){

  responce.send("<h1>About site</h1>");
});

app.get("/contact", function(request, responce){

  responce.send("<h1>Contact</h1>");
});
//Начинаем прослушивание подключения на 3000 порту
app.listen(PORT, ()=> console.log("Listening on " + PORT));
