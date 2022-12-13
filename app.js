const express=require("express");
const bodyParser=require("body-parser");
const request = require('request');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/quote",function(req,res){
  var category=req.body.qcat
  request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
  headers: {
    'X-Api-Key': process.env.API
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
    var quote=JSON.parse(body);

    res.write("<body style=background-color:#DEF5E5;margin:16vh 30px;></body>");
    res.write("<h1 style=color:#10A19D;text-decoration:underline;text-align:center;font-size:40px;>Quote of the Day</h1>");
    res.write("<b style= font-size:35px;>Quote:</b><br><p style=font-size:33px;>"+quote[0].quote+"</p><br>");
    res.write("<b style= font-size:35px;>Author:</b><p style=font-size:33px;>"+quote[0].author+"</p><br>")
    res.write("<b style= font-size:35px;>Category:</b><p style=font-size:33px;>"+quote[0].category+"</p><br>");
  }
});
})

app.listen(3000,function(){
  console.log("Server started");
});
