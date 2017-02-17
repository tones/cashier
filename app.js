var express = require('express')
var bodyParser = require('body-parser')
const router = require('./router.js')


app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))
app.use('/bower',  express.static(__dirname + '/bower_components'))
app.use(router)
app.listen(8888)
