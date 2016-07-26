var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    url = require('url'),
    repository = require('../models/data');

router.get('/*', function(req, res){
  var parsedUrl = url.parse(req.url, true, true),
      fullUrl = parsedUrl.href.split(''),
      randomNum = Math.round(Math.random() * 10000);

  fullUrl.shift();
  fullUrl = fullUrl.join('');

  if(!fullUrl){
    return res.redirect('/');
  }
  
  if(fullUrl.match(/(https?:\/\/)(www\.)?.+\.com/)){
    var newId = false;
    while(newId = false){
      repository.urlCheck({_id: randomNum},function(err, result){
        if(err){
          console.log(err);
        }
        if(result.length === 0){
          newId = true;
        }
      })
    }
    repository.addUrl({'_id': randomNum, 'url': fullUrl});
    res.json({'original_url': fullUrl, 'short_url': req.protocol + '://' + req.host+ '/' + randomNum});
  } else {
    res.json({'error': 'Need a valid http address'});
  }
})

module.exports = router;