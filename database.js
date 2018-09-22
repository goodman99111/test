const mongoClient = require("mongodb").MongoClient;
var uri = "mongodb+srv://vito_wood:zubok1999@cluster0-2aagf.mongodb.net/test?retryWrites=true";
var user = {};
//роверка ника на доступность
function checkVariableNick(user_nick){
    BD.findOne({nick: user_nick}, function(err, result){
        if(err)
            console.log("Что-то не так");
        if(result == null) //если такого ника нет то возращаем true иначе flase
            return true
        else
            return false
    })
};

function login(user_nick, user_password, socket){
    mongoClient.connect(uri, function(err, client){
        const BD = client.db("Main").collection("Users");
        BD.findOne({nick: user_nick, password: Number(user_password)}, function(err, result){
            if(result != null){
                socket.emit('login_res', true, user_nick);
            }
            else{
                socket.emit('login_res', false);
            }
            
            /*
            if(result != null) //если нашло пользователя, то авторизуем его
            {
                console.log(result + " авторизовался");
                client.close();
                return true;
            }
            else
            {
                console.log('Пользователь не найден');
                client.close();
                return false;
            }   
            */
    });
    });
}

module.exports.login = login;
module.exports.checkVariableNick = checkVariableNick;

