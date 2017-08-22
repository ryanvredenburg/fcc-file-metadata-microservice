'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use('/public', express.static(process.cwd() + '/public'));


app.route('/get-file-size')
  .post( upload.single('uploadFile'), function (req, res, next) {
      res.json({size:req.file.size})
})

app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

