'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression');


app.use(compression());
app.get('*', express.static(path.join(__dirname, 'src')));

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Server started on port: ' +  app.get('port'));
});
