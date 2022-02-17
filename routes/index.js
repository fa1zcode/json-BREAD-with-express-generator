var express = require('express');
var router = express.Router();
const fs = require('fs')
var path = require('path');


let data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data.json')))

router.get('/', function (req, res) {
  res.render('list', { data })      //render data.json pada list.ejs                 
})

router.get('/add', function (req, res) {
  res.render('add')
})

router.post('/add', function (req, res) {
  let taskstring = req.body.string
  let taskinteger = req.body.integer
  let taskfloat = req.body.float
  let taskdate = req.body.date
  let taskboolean = req.body.boolean

  let todo = {
    string: taskstring,
    integer: taskinteger,
    float: taskfloat,
    date: taskdate,
    boolean: taskboolean
  }

  data.push(todo)
  fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf-8')
  res.redirect('/')
})

router.get('/delete/:id', function (req, res) {
  const id = req.params.id
  data.splice(id, 1)
  res.redirect('/')
})

router.get('/edit/:id', function (req, res) {
  const id = req.params.id
  //console.log(data[id])
  res.render('edit', { data: data[id] })
})

router.post('/edit/:id', function (req, res) {
  const id = req.params.id
  data[id].string = req.body.string
  data[id].integer = req.body.integer
  data[id].float = req.body.float
  data[id].date = req.body.date
  data[id].boolean = JSON.parse(req.body.boolean)
  //data[id].complete = JSON.parse(req.body.complete)
  fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf-8')
  res.redirect('/')
})


module.exports = router;
