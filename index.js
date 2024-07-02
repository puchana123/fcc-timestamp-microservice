// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

// This is where a solution start
// api with date input
app.get("/api/:date", (req,res)=>{
  let date_string = req.params.date;

  // check a number or not
  if(!isNaN(date_string)){
    // is a number
    res.json({unix: Number(date_string), utc: new Date(Number(date_string)).toUTCString()})
  }else{
    // not a number
    if((new Date(date_string)).toString() !== 'Invalid Date'){
      // is valid Date
      res.json({unix: Date.parse(date_string), utc: new Date(date_string).toUTCString()})
    }else{
      // is invalid Date
      res.json({error: "Invalid Date"})
    }
  }
})

// api without input
app.get("/api", (req,res)=>{
  let d = new Date();
  res.json({unix: Date.parse(d),utc: d.toUTCString()})
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
