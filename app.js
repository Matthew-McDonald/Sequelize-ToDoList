const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// const todos = [
// // {item: "Wash the car", status: "checked"}
// ];

// const todos = models.todo.build({
//   item: "Wash the car",
//   status: false
// })
//
// todos.save().then(function(newTodos){
//   console.log(newTodos)
// })


//GET FUNCTION

app.get("/", function (req, res) {
  models.todo.findAll().then(function(todolist) {
  res.render('todo', { todos: todolist })
  })

});


//POST FUNCTION

app.post("/", function (req, res) {
  const todos = models.todo.build({
    item: req.body.user,
    status: req.body.completed
  })

  todos.save().then(function(newTodos){
    // console.log(newTodos)
    res.redirect('/');

  })

  // req.checkBody("user", "You must enter a todo!").notEmpty();
  //
  // var errors = req.validationErrors();
  // if (errors) {
  //   res.render('errors', { todos: todos });
  //
  // } else {
  //   todos.push(req.body.user);
  //   res.redirect('/');
  // }

});

//LISTEN FOR PORT 3000

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
