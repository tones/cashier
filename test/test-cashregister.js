var _ = require('lodash')
var chai = require('chai')
var assert = chai.assert;
const Config = require('../config.js')
const CashRegister = require('../models/cashregister.js')

describe('CashRegister:', function() {
  it('initializes with the appropriate amount in the drawer', function(){
    const initialCount = 4
    var cRegister = new CashRegister(initialCount)
    var expectedTotal = _(Config.denominations)
                        .map(n => n * initialCount)
                        .sum()
    assert.equal(cRegister.totalValue(), expectedTotal)
  })

  describe('In a successful transaction', function() {
    const initialCount = 10
    const price = 21
    const payment = 21

    var cRegister = new CashRegister(initialCount)
    var initialTotal = cRegister.totalValue()
    var changeBundle = cRegister.transact(price, payment)

    it ('returns correct change', function(){
      assert.equal(changeBundle.totalValue(), (payment - price))
    })

    it ('correctly updates the drawer', function(){
      var expectedTotal = initialTotal + payment - changeBundle.totalValue()
      assert.equal(cRegister.totalValue(), expectedTotal)
    })
  })

  describe('In a transaction with insufficient funds in the drawer', function(){
    const price = 100000
    const payment = 90000

    var cRegister = new CashRegister(1)
    var initialTotal = cRegister.totalValue()
    var changeBundle = cRegister.transact(price, payment)

    it ('returns an error', function(){
      assert.isNotOk(changeBundle)
    })

    it ('does not modify the drawer', function(){
      assert.equal(cRegister.totalValue(), initialTotal)
    })
  })

  describe('In a transaction with insufficient change in the drawer', function(){
    const price = 99
    const payment = 100

    var cRegister = new CashRegister(0)
    cRegister.drawer.addValue(2000)
    var initialTotal = cRegister.totalValue()
    var changeBundle = cRegister.transact(price, payment)

    it ('returns an error', function(){
      assert.isNotOk(changeBundle)
    })

    it ('does not modify the drawer', function(){
      assert.equal(cRegister.totalValue(), initialTotal)
    })
  })

})
