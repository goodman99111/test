//response - ответ
//request - запрос

function login(socket){
    var nick = document.getElementById('input_login').value;
    var password = document.getElementById('input_password').value;
    if(nick != null && password != null)
    {
        console.log('Nick: ' + nick + ' Pass: ' + password);
        socket.emit('login_req', nick, password);
    }
    else
        document.getElementById('ERROR_INCORRECT_L_P').style.display="inline";
}
