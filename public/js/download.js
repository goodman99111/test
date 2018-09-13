document.getElementById('upload').addEventListener('change', FileChosen);

var SelectedFile;
function FileChosen(evnt){
    SelectedFile = evnt.target.files[0];
    StartUpload();
}

var Name;
var FReader;
function StartUpload() {
    Name = SelectedFile.name;
    FReader = new FileReader();
    FReader.readAsArrayBuffer(SelectedFile);
    FReader.onload = function(evnt){
        socket.emit('Upload', {'Name': Name, 'Data': evnt.target.result});
    }
}