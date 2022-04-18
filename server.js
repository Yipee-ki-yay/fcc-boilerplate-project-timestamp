// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:unixParam([0-9]+)', (req, res) => {
  const unixParam = Number(req.params.unixParam) / 1000
  const unix = Number(req.params.unixParam)
  const utc = moment.unix(unixParam).format('ddd, DD MMM YYYY HH:mm:ss')

  res.json({
    unix,
    utc
  })
})

app.get('/api/:date([0-9]{4}-[0-9]{2}-[0-9]{2})', (req, res) => {
  console.log('date req.params.date', req.params.date);

  const date = req.params.date
  const unix = Number(moment(date).format('x'))
  const utc = moment(date).format('ddd, DD MMM YYYY HH:mm:ss')

  res.json({
    unix,
    utc
  })
})
