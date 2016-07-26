var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    repository =require('../models/data');

  router.get('/:id?', function(req, res){
    var param = req.params.id;

    if(!param){
      res.render('index');
    } else if(!+param){
      return res.redirect('/');
    } else {
      repository.urlCheck({_id: +param}, function(err, match){
        if(err){
          console.log(err);
        }
        if(match.length == 0){
          res.json({'error': 'Could not find address'});
        } else {
          res.redirect(match[0].url);
        } 
      })
    }
  })

module.exports = router;
