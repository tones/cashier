var express = require('express')
const pug = require('pug')
var router = express.Router()

CashRegister = require('./models/cashregister.js')
var cRegister = new CashRegister(10)

// our HTML front-page
router.get('/', function (req, res, next) {
  const index = pug.compileFile('./views/index.pug').call()
  res.send(index)
  next()
})

// `drawer` returns the current contents of the cash drawer in JSON
router.get('/drawer', function (req, res, next) {
  var output = cRegister.drawer
  output.total = cRegister.totalValue()
  res.json(output)
  next()
})

// `transaction` makes change from the drawer
router.post('/transaction', function (req, res, next) {
  var payment = req.body.payment
  var price = req.body.price
  var output = cRegister.transact(price,payment)
  if (output) { output.total = output.totalValue() }
  res.json(output)
  next()
})

module.exports = router
