const express = require('express')
const app = express()
const port = 3000
var path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser')
const webpush = require('web-push');
const addPushSubscriber = require("./routes/add-push-subscriber").addPushSubscriber;
const getSubscribers = require("./routes/get-subscribers").getSubscribers;
const pushNotification= require("./routes/push-a-notification").pushNotification;


/*
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods": "POST");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
*/
 app.use(function (req, res, next) {

     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);

     // Pass to next layer of middleware
     next();
 });


 //app.use(bodyParser.urlencoded());
 app.use(bodyParser.json());
//app.use(express.urlencoded());
//app.use(cors)
//app.use(express.json());
// Parse JSON bodies (as sent by API clients)


app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/admin.html'));
});

app.post('/addSubscriber',addPushSubscriber);
app.get("/getSubscribers",getSubscribers);
app.post("/pushNotification",pushNotification)
/*
app.get("/getSubscribers",(req,res)=>{
res.send(JSON.stringify({message:"get subscribers worked"}))
})
*/

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
