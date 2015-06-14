var express = require('express');
var path = require('path');
var app = express();
var schedule = require('node-schedule');
var moment = require('moment');
var fs = require('fs');
var reservoir = require('TaiwanReservoirAPI');

// Defined output data
//var reservoirData;

var emailSystem = require('./email');
//emailSystem();

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

function getReservoirData() {
  reservoir(function(err, data) {
    if (err) console.error(err);

    var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    fs.exists('./data/' + yesterday, function(exists) {
      if (!exists) {
        fs.writeFile('./data/' + yesterday, JSON.stringify(data), function(err) {
          if (err) return console.log(err);
          console.log('Write data to ' + yesterday);
        });
      }
    });
  });
}
getReservoirData();

var updateData = schedule.scheduleJob('*/30 * * * 1-5', function() {
  var today = moment().format('YYYY-MM-DD');

  reservoir(function(err, data) {
    fs.writeFile('./data/' + today, JSON.stringify(data), function(err) {
      if (err) return console.log(err);
      console.log('Write data to ' + today);
    });
  });

});

//本表各項資料由各水庫管理單位在每日上午8時30分前輸入（星期六、日之資料則在星期一統一輸入）
var saveData = schedule.scheduleJob({
    hour: 9,
    minute: 0,
    dayOfWeek: [new schedule.Range(1, 6)]
  },
  getReservoirData
);

var holidayData = schedule.scheduleJob({
    hour: 9,
    minute: 0,
    dayOfWeek: 1
  },
  function() {
    // 星期六、日之資料則在星期一統一輸入
  }
);

// app.use('/', function (req, res) {
//   res.render('index');
// });

app.get('/data', function(req, res) {

  var today = moment().format('YYYY-MM-DD');

  fs.exists('./data/' + today, function(exists) {
    if (exists) {
      fs.readFile('./data/' + today, function(err, data) {
        if (err) throw err;
        return res.json({
          data: JSON.parse(data)
        });
      });
    } else {
      reservoir(function(err, data) {
        if (err) throw err;

        fs.writeFile('./data/' + today, JSON.stringify(data), function(err) {
          if (err) return console.log(err);
          console.log('Write data to ' + today);
        });

        return res.json({
          data: data
        });
      });
    }
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

app.listen(8888, function() {
  console.log('Server running sucessfully....');
});
