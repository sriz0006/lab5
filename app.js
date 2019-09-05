/* eslint-disable no-undef */
var express = require('express')
// eslint-disable-next-line no-undef
var indexRouter = require('./routes/index.js')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('bower_components'));
app.use('/bootstrap', express.static(path.join(__dirname, 'bower_components/bootstrap/')))
app.use('/jquery', express.static(path.join(__dirname, 'bower_components/jquery/')))
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets/')))
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', indexRouter)
app.listen('8080')
console.log('Server running at http://localhost:8080')
