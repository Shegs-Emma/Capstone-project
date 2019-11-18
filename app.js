const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      userRoutes            = require('./routes/user'),
      gifRoutes             = require('./routes/gif'),
      articleRoutes         = require('./routes/articles');


// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/v1', articleRoutes);



module.exports = app;