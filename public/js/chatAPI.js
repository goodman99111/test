// Отображает старые сообщения
function loadHistory(message) {
    message.forEach(function(item, i, arr){
        var str = '<div class="msg_m">\
            <div class="msg_top_line"></div>\
            <span class="msg_text_m_style">' + item +'</span>\
            </div<\
            ';
    var div = document.createElement('div');
    div.innerHTML = str;
    message_window.appendChild(div);
    scroll_toEnd("message_window");
    });
}

function load_img(userName, nameIMG){
    userName += ':';
    var str =  '<div class="msg_m">\
        <div class="msg_top_line"></div>\
        <span class="msg_text_m_style">'+userName+'</span>\
        <img align="top" src="Temp/' + nameIMG + '"/>\
        </div<\
        ';
    var div = document.createElement('div');
    div.innerHTML = str;
    message_window.appendChild(div);
    scroll_toEnd("message_window");
}