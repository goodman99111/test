
var activ_area;
var window_area;
var stop = 0;

function loadEvent()
{

activ_area = document.getElementById('activ-area');// body документа
area_window = document.getElementById('area_window'); //форма получения файлы

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    activ_area.addEventListener(eventName, preventDefaults, false)
  })

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    area_window.addEventListener(eventName, preventDefaults, false)
  })

//События которое срабатывает при переносе файла на страницу
;['dragenter', 'dragover'].forEach(eventName => { 
    activ_area.addEventListener(eventName, createForm, false)
  })

//Функция которая срабатывает, когда файл покидает приделы страницы
;['drop'].forEach(eventName => {
    activ_area.addEventListener(eventName, delForm, false)
})


;['dragenter', 'dragover'].forEach(eventName => { 
  area_window.addEventListener(eventName, Detect, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  area_window.addEventListener(eventName, delDetect, false)
})

area_window.addEventListener('drop', handleDrop ,false);

}

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

function createForm(e)
{
    if(stop == 0)
    {
        let str = '<div id="main_area">\
                 <form id="send_file_form">\
                    <p id="info_load_file">Перенесите нужные файлы для отправки<p>\
                    <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">\
                    </form>\
                  </div>';
        div = document.createElement('div');
        div.innerHTML = str;
        area_window.appendChild(div);
        area_window.classList.add('main-area');
        stop = 1;
    }
    //stop=1;
}

function delForm()
{
  stop = 0;
  area_window.classList.remove('main-area');
  area_window.innerHTML = '';
}

function Detect()
{
  area_window.classList.add('highlight');
}

function delDetect() 
{
 area_window.classList.remove('highlight');
}

function handleDrop(e)
{
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files)
{
  ([...files].forEach(uploadFile));
}

function uploadFile(file)
{
  let url = 'http:localhost:8080';
  let formData = new FormData();

  formData.append('file', file);

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(() => { /*Готово. Информируем пользователя */ })
  .catch(() => { /* Ошибка. Информируем пользователя */} )
}