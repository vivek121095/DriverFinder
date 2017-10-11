//require express module
const express = require('express');
//require custom router made by us
const routes = require('./routes/api');
//setup bodyParser to access request body of reqest
const bodyParser = require('body-parser');
//setup mongoose to connect to mongodb
const mongoose = require('mongoose');
//setup express app
const app = express();
//connect to mongodb
mongoose.connect('mongodb://localhost/chalmerebhai',
                  {useMongoClient : true} //deprecated warning solution
                );
//mongoose promise is deprecated so we are assigning it to global promise
mongoose.Promise = global.Promise;
//MiddleWare-0 For Handling Static file such as index.html , style.css
app.use(express.static('public'));
//MiddleWare 1 - entry point
app.use(bodyParser.json());
//Tell application to use routes
//initialize routes
//Middleware 2
app.use('/api'// Any request of /api/* would be using this routes
        ,routes);
//Middleware 3 - Error Handling
app.use(function(err,req,res,next) {
  //console.log(err);
  res.status(422).send({"error": err._message});
});
//creating server which listing to port  4000
app.listen(process.env.port||4000,
  //callback function
  function() {
  console.log('now listining to port 4000');
});
