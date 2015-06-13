var path = require('path'),
  templatesDir = path.resolve(__dirname, '.', 'templates'),
  emailTemplates = require('email-templates'),
  nodemailer = require('nodemailer');

function RandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < Math.random() * 100000; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = emailTemplates(templatesDir, function(err, template) {

  if (err) {
    console.log(err);
  } else {
    // Prepare nodemailer transport object
    var transportBatch = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        user: "1032se.team7",
        pass: "NCCU1032SE"
      }
    });

    // An example users object
    var count = 0;
    var users = [{
      email: 'seal789ie@gmail.com',
      name: {
        first: 'Pappa',
        last: 'Pizza'
      },
      content: RandomString()
    }, {
      email: 'mingsuper@gmail.com',
      name: {
        first: 'Jerry',
        last: 'Wang'
      },
      content: RandomString()
    }, {
      email: '100703029@nccu.edu.tw',
      name: {
        first: 'Eric',
        last: 'TYL'
      },
      content: RandomString()
    }, {
      email: '101703049@nccu.edu.tw',
      name: {
        first: '柏辰',
        last: '林'
      },
      content: RandomString()
    }, {
      email: 'businputer5865@gmail.com',
      name: {
        first: '一嘉',
        last: '蔡'
      },
      content: RandomString()
    }];

    // Custom function for sending emails outside the loop
    //
    //  We need to patch postmark.js module to support the API call
    //  that will let us send a batch of up to 500 messages at once.
    //  (e.g. <https://github.com/diy/trebuchet/blob/master/lib/index.js#L160>)
    var Render = function(locals) {
      this.locals = locals;
      this.send = function(err, html, text) {
        if (err) {
          console.log(err);
        } else {
          transportBatch.sendMail({
            from: 'Taiwan WaterReservoir<seal456ie@gmail.com',
            to: locals.email,
            subject: 'Script Email Sending Test',
            html: html,
            // generateTextFromHTML: true,
            text: text
          }, function(err, responseStatus) {
            count++;
            if (err) {
              console.log(err);
            } else {
              console.log(responseStatus.message);
            }

            if (count === users.length)
              transportBatch.close();
          });
        }
      };
      this.batch = function(batch) {
        batch(this.locals, templatesDir, this.send);
      };
    };

    // Load the template and send the emails
    template('welcome-email', true, function(err, batch) {
      for (var user in users) {
        var render = new Render(users[user]);
        render.batch(batch);
      }

    });

  }
});
