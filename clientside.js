    var socket = io.connect('http://localhost:3000/',{reconnect:true,'multiplex':false});
    var upload = function(){
    var img = document.getElementById("inputGroupFile01").files;
    var textf = document.getElementById("subjectid");
    console.log(textf.value);
    if (img.length>0) {
    var imgfile = img[0];
    var filereader = new FileReader();
    filereader.onload = function(fileLoadedEvent){
    var srcData =   fileLoadedEvent.target.result;
    console.log(JSON.stringify(srcData));
    srcData.replace(/^data:image\\/(png|jpg);base64,/,"");
    console.log("sending image");
    var objimg = {"img2base64":srcData, "subjectid" : textf.value};
    socket.emit('base64img',srcData);
    
    /*$.ajax({
    url: 'http:localhost:3000/',
    type: 'POST',
    json:{
    data: srcData
    },
    //contentType: 'image',
    //dataType: 'text',
    success: function(data){
    console.log("successful");
    console.log(data);
    },
    error: function(error){
    console.log(error);
    }
    });*/
    }
    filereader.readAsDataURL(imgfile);
    }
    //var imagedata = img.files[0];
    //console.log(imagedata.name);
    //console.log(imagedata.size);
    return false;
    } ;