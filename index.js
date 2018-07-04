var request = require('request'); 
var fs = require('fs');
var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyparser = require('body-parser');
var path = require('path');
var base64 = require('node-base64-image');

//var sauravC = 'saurav.png';
//var finalImage = new Buffer(sauravC).toString('base64');
//console.log(finalImage);
var sauravq = fs.readFileSync('saurav9.jpg','base64');
//io.set('origins', 'http://localhost:3000');
app.use(bodyparser.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//kairos api call


/*io.on('connection',function(socket){
	socket.on('base64image',function(data){
		console.log(data);
	})
});
*/

app.get('/',function(req,res){
	res.render('index');

});


app.post('/train',function(req,res){
	//var datareq = JSON.parse(req.body);
	var temp = JSON.stringify(req.body);
	var datareq = JSON.parse(temp);
	var subjectide = datareq["subjectid"];
	console.log("Subject id:", subjectide);
	//console.log(temp);
	var base64data = datareq["img2base64"];
	var justthestringpart = base64data.split(',')[1];
	//console.log(justthestringpart);
	//kairos api call
	fs.writeFile("output.jpg", new Buffer(justthestringpart, "base64"), function(err) {});



	var reqbody = {'image' : justthestringpart, 'subject_id': subjectide, 'gallery_name': 'HackathonTeam'};
request({
	method: 'POST',
	url: ' https://api.kairos.com/enroll',
	headers: {
		'Content-Type': 'application/json',
		'app_id' : 'a7fe32f7',
		'app_key' : '57d01d777903e22546297da605141f30'
	},
	body : JSON.stringify(reqbody) 
	//"{ \"image\" : \"sauravC\", \"subject_id\" : \"Saurav Ingawale\", \"gallery_name\": \"HackathonTeam\"}"
}, function(err, res, body){
 console.log('Status:', res.statusCode); 
  console.log('Response:', body);
});

});

app.listen(3000);