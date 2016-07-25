var express = require('express');
var http = require('http');
var url = require('url');
var mongodb = require('mongodb');
var app = express();
var MongoClient = mongodb.MongoClient;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

var myUrl = ENV['MONGOLAB_URI'];      

MongoClient.connect(myUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:');
  } 
  
  app.get('/', function(req, res){
    res.render('index');
  })
  
  app.get('/new/*', function(req, res){
    var parsedUrl = url.parse(req.url, true, true);
    var fullUrl = parsedUrl.href.split('/new/')[1];
    var randomNum = Math.round(Math.random() * 10000);
    
    if(fullUrl.match(/(https?:\/\/)(www\.)?.+\.com/)){
      var newId = false;
      while(newId = false){
        db.collection('uri').find({_id: randomNum}).toArray(function(err, results){
          if(results.length === 0){
            newId = true;
          }
        });
      }
      db.collection('uri').insert({_id: randomNum, url: fullUrl});
      res.end(JSON.stringify({original_url: fullUrl, short_url: req.protocol + '://' + req.host+ '/' + randomNum}));
    } else {
      res.end(JSON.stringify({error: 'Need a valid http address'}));
    }
  })
  
    
  app.get('/:id?', function(req, res){
    var param = +req.params.id;
    
    db.collection('uri').find({_id: param}).toArray(function(err, match){
      if(match.length == 0){
        res.end(JSON.stringify({error: 'Could not find address'}));
      } else {
        res.redirect(match[0].url);
      } 
    });
  })

  http.createServer(app).listen(process.env.PORT || 3000, function(){
    console.log("listening...");
  });
});
  

  
