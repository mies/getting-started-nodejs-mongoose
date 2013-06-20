// Requires

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
  Todo.find(function(err, result) {
    res.send(result);
  });
});

app.get('/todos/:author', function(req, res) {
  Todo.findOne({'author': req.params.author}, function(err, result) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.send({result: result});
    }
  });
});

app.post('/todos', function(req, res) {
  new Todo({action: req.body.action, author: req.body.author}).save();
  res.send({'new todo' : req.body.action});
});

// startup server
port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port number: ", port);
});

module.exports = app;
