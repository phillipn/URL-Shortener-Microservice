var express = require('express'),
    url = require('url'),
    app = express(),
    rootPath = require('./routes/root'),
    newPath = require('./routes/new'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    myUrl = process.env.MONGOLAB_URI,
    conn = mongoose.connection,
    options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
    
mongoose.connect(myUrl, options);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use('/new', newPath);
app.use('/', rootPath);
   
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  app.listen(process.env.PORT || 3000, function(){
    console.log('listening...');
  })
})


  

  
