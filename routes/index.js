/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectID
var express = require('express')
var router = express.Router()

const url = 'mongodb://localhost:27017/'
let db
mongodb.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log('Could not connect')
  } else {
    console.log('Connected to cooldb')
    db = client.db('cooldb')
  }
})

/* GET home page. */
var index = router.get('/', function (req, res) {
  res.render('index.html')
})

/* Mew Task */
var task = router.get('/newTask', function (req, res) {
  res.render('newTask.html')
})

router.post('/removetask', function (req, res) {
  const id = new ObjectId(req.body.taskid)
  db.collection('week6lab').deleteOne({ _id: id })
  res.redirect('/listTasks')
})

router.get('/removeTask', function (req, res) {
  res.render('removeTask.html')
})

/* List Tasks */
router.get('/listTasks', function (req, res) {
  db.collection('week6lab').find({}).toArray(function (_err, d) {
    res.render('listTasks.html', { tasks: d })
  })
})

router.get('/updateTask', function (req, res) {
  res.render('updateTask.html')
})

router.post('/updatetask', function (req, res) {
  const id = new ObjectId(req.body.taskid)
  const filter = { _id: id }
  const update = { $set: { status: req.body.status } }
  db.collection('week6lab').updateOne(filter, update)
  res.redirect('/listTasks')
})

router.post('/addtask', function (req, res) {
  db.collection('week6lab').insertOne({
    name: req.body.name,
    due: req.body.due,
    desc: req.body.desc,
    asignee: req.body.asignee,
    status: req.body.status
  })
  res.redirect('/listTasks')
})

module.exports = router
