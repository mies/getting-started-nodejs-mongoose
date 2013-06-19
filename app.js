var express = require('express');
var mongoose = require ("mongoose");

var app = express();
app.use(express.bodyParser());

var Todo = require('./models/todo');

// Configure express
app.configure('development', function() {
  mongoose.connect('mongodb://localhost/todos');
});

app.configure('test', function() {
  mongoose.connect('mongodb://'+ process.env.WERCKER_MONGODB_HOST + '/todos');
});

app.configure('production', function() {
  mongoose.connect('mongodb://localhost/todos');
});


// Routes
app.get('/', function(req, res) {
  res.send({'version' : '0.0.1'});
});

app.get('/todos', function(req, res) {
});

app.get('/todos/:todo', function(req, res) {
});

app.post('/todos', function(req, res) {
  console.log(req.params);
  console.log(req.body.title);
  new Todo({title: req.body.title, author: req.body.author}).save();
  res.send({'new todo' : 'success'});
});

// startup server
port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port number: ", port);
});
