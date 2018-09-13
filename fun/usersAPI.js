//Массив ID[]-массив ID подключений
//Массив Nick[]-массив ников
//Id[0], Nick[0]- один пользователь

//Заменяем рандомный ник на ник созданный пользователем

"use strict"
var arrID = [];
var arrNick = [];

function addNick(id, nick){
  var index = arrID.indexOf(id);
  arrNick[index] = nick;
  console.log("add nick: " + nick + ". ID: " + id)
}
//Добавляем новый ID и в соответствие ему рандомный ник
function addID(id){
  arrID.push(id);
  console.log("Add new ID: " + id);
  arrNick.push(generateRandomNick(1,100000));
}

//Удаляем ID и соответсвующий ему ник
function delID(id){
  var index = arrID.indexOf(id); // получаем индекс ID
  arrID.splice(index, 1); //удаляем этот ID из массива
  console.log("delete nickname: " + arrNick[index]);
  arrNick.splice(index, 1);//удаляем ник соответствующий ID
  console.log("delete ID: " + id);
}

//создаём рандомный никнейм
function generateRandomNick(min, max){
 var randomNick = "user" + Math.floor(Math.random() * (max - min + 1)) + min;
 console.log('generate random nickname: ' + randomNick);
 return randomNick;
}

//Получаем ник пользователя
function getNick(id){
  var index = arrID.indexOf(id);
  return arrNick[index];
}

//Возвращаем массив ников
function getNicks(){
  return arrNick;
}

//Возвращаем массив ID подключений
function getIDs(){
  return arrID;
}

module.exports.delID = delID;
module.exports.addID = addID;
module.exports.addNick = addNick;
module.exports.generateRandomNick = generateRandomNick;
module.exports.getNick = getNick;
module.exports.getIDs = getIDs;
module.exports.getNicks = getNicks;
