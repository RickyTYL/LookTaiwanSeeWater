var express = require('express');
var path = require('path');
var app = express();
var reservoir = require('TaiwanReservoirAPI');

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', function (req, res) {
//
//
//});

app.get('/data',function(req, res){
    reservoir(function (err, reservoirData) {
        if (err) {
            return res.json({
                err: err.toString()
            });
        }

        return res.json({
            data: reservoirData
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});

app.listen(8888, function () {
  console.log('Server running sucessfully....');
});
