const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// const input = document.getElementById('inputItem')

const todos = [
// {item: "Wash the car", status: "checked"}
];

//GET FUNCTION

app.get("/", function (req, res) {
  res.render('todo', { todos: todos });
});


//POST FUNCTION

app.post("/", function (req, res) {

  req.checkBody("user", "You must enter a todo!").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.render('errors', { todos: todos });
    // var html = errors;

    // res.send(html);
  } else {
    todos.push(req.body.user);
    res.redirect('/');
  }

});

//LISTEN FOR PORT 3000

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
