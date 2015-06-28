var express = require('express');
var path = require('path');
var app = express();
var schedule = require('node-schedule');
var moment = require('moment');
var fs = require('fs');
var async = require('async');
var reservoir = require('TaiwanReservoirAPI');

// Defined output data
//var reservoirData;

var emailSystem = require('./email');
//emailSystem();

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

var saveDataWithDate = function saveData(pastDay) {
  var date = moment().subtract(pastDay, 'days').format('YYYY-MM-DD');
  reservoir.getPastStatistic(function(err, data) {
    if (err) {saveData(pastDay);}
    fs.writeFile('./data/' + date, JSON.stringify(data), function(err) {
      if (err) saveData(pastDay);
      console.log('Write data to ' + date);
    });
  }, pastDay);
};

// function getReservoirData() {
//   reservoir.getPastStatistic(function(err, data) {
//     if (err) console.error(err);
//
//     var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
//     fs.writeFile('./data/' + yesterday, JSON.stringify(data), function(err) {
//       if (err) getReservoirData();
//       console.log('Write data to ' + yesterday);
//     });
//   }, 1);
// }
saveDataWithDate(1);
//getReservoirData();

function saveSevenData() {
  for (var i = 2; i <= 7; i++) {
    (function(index) {
      var time = moment().subtract(index, 'days').format('YYYY-MM-DD');
      fs.exists('./data/' + time, function(exists) {
        if (!exists) {
          saveDataWithDate(index);
        }
      });
    })(i);
  }
}
saveSevenData();

var updateData = schedule.scheduleJob('*/30 * * * 1-5', function() {
  var today = moment().format('YYYY-MM-DD');

  reservoir.immediate(function(err, data) {
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
  function()
  {
    saveDataWithDate(1);
  }
);

var holidayData = schedule.scheduleJob({
    hour: 9,
    minute: 0,
    dayOfWeek: 1
  },
  function() {
    // 星期六、日之資料則在星期一統一輸入
    saveDataWithDate(1);
    saveDataWithDate(2);
    saveDataWithDate(3);
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
      reservoir.immediate(function(err, data) {
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

app.get('/chart', function(req, res) {

  async.parallel({
      one: function(callback) {
        fs.readFile('./data/' + moment().subtract(7, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      },
      two: function(callback) {
        fs.readFile('./data/' + moment().subtract(6, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      },
      three: function(callback) {
        fs.readFile('./data/' + moment().subtract(5, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      },
      four: function(callback) {
        fs.readFile('./data/' + moment().subtract(4, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      },
      five: function(callback) {
        fs.readFile('./data/' + moment().subtract(3, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      },
      six: function(callback) {
        fs.readFile('./data/' + moment().subtract(2, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      },
      seven: function(callback) {
        fs.readFile('./data/' + moment().subtract(1, 'days').format('YYYY-MM-DD'), function(err, data) {
          if (err) callback(err);
          callback(null, JSON.parse(data));
        });
      }
    },
    function(err, results) {
      var data = [results.seven,results.six,results.five,results.four,results.three,results.two,results.one];

      var chartData = [];

      for (var i = 6; i >= 0; i--)
      {
        var object = { date: moment().subtract(i+1, 'days').format('YYYY-MM-DD') };
        for(var j=0; j < data[i].length; j++)
        {
          var property = data[i][j].reservoirName;
          var value = (data[i])[j].lastPercentage;
          object[property] = value;
        }
        chartData.push(object);
      }
      res.json(chartData);
    });
});

app.get('/chart30', function(req, res) {

  async.parallel({
      d1: function(callback) {readPastData(30,callback);},
      d2: function(callback) {readPastData(29,callback);},
      d3: function(callback) {readPastData(28,callback);},
      d4: function(callback) {readPastData(27,callback);},
      d5: function(callback) {readPastData(26,callback);},
      d6: function(callback) {readPastData(25,callback);},
      d7: function(callback) {readPastData(24,callback);},
      d8: function(callback) {readPastData(23,callback);},
      d9: function(callback) {readPastData(22,callback);},
      d10: function(callback) {readPastData(21,callback);},
      d11: function(callback) {readPastData(20,callback);},
      d12: function(callback) {readPastData(19,callback);},
      d13: function(callback) {readPastData(18,callback);},
      d14: function(callback) {readPastData(17,callback);},
      d15: function(callback) {readPastData(16,callback);},
      d16: function(callback) {readPastData(15,callback);},
      d17: function(callback) {readPastData(14,callback);},
      d18: function(callback) {readPastData(13,callback);},
      d19: function(callback) {readPastData(12,callback);},
      d20: function(callback) {readPastData(11,callback);},
      d21: function(callback) {readPastData(10,callback);},
      d22: function(callback) {readPastData(9,callback);},
      d23: function(callback) {readPastData(8,callback);},
      d24: function(callback) {readPastData(7,callback);},
      d25: function(callback) {readPastData(6,callback);},
      d26: function(callback) {readPastData(5,callback);},
      d27: function(callback) {readPastData(4,callback);},
      d28: function(callback) {readPastData(3,callback);},
      d29: function(callback) {readPastData(2,callback);},
      d30: function(callback) {readPastData(1,callback);}
    },
    function(err, results) {
      var data = [results.d1,results.d2,results.d3,results.d4,results.d5,results.d6,results.d7,results.d8,results.d9,results.d10,results.d11,results.d12,results.d13,results.d14,results.d15,results.d16,results.d17,results.d18,results.d19,results.d20,results.d21,results.d22,results.d23,results.d24,results.d25,results.d26,results.d27,results.d28,results.d29,results.d30];

      var chartData = [];

      for (var i = 0; i < 30; i++)
      {
        var object = { date: moment().subtract(30-i, 'days').format('YYYY-MM-DD') };
        for(var j=0; j < data[i].length; j++)
        {
          var property = data[i][j].reservoirName;
          var value = data[i][j].lastPercentage;
          object[property] = value;
        }
        chartData.push(object);
      }
      res.json(chartData);
    });
});

function readPastData(pastDay,callback)
{
  fs.readFile('./data/' + moment().subtract(pastDay, 'days').format('YYYY-MM-DD'), function(err, data) {
    if (err) callback(err);
    callback(null, JSON.parse(data));
  });
}
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

app.listen(80, function() {
  console.log('Server running sucessfully....');
});
