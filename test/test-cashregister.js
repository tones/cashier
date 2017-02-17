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
    assert.equal(cRegister.totalValue, expectedTotal)
  })

  describe('In a successful transaction', function() {
    const initialCount = 10
    const price = 23
    const payment = 100

    var cRegister = new CashRegister(initialCount)
    var initialTotal = cRegister.totalValue
    var transaction = cRegister.transact(price, payment)
    var changeValue = CashRegister.totalValueOfDenomMap(transaction)

    it ('returns correct change', function(){
      assert.equal(changeValue, (payment - price))
    })

    it ('correctly updates the drawer', function(){
      var expectedTotal = initialTotal + payment - changeValue
      assert.equal(cRegister.totalValue, expectedTotal)
    })
  })

  describe('In a transaction with no dimes in the drawer', function(){
    var cRegister = new CashRegister(0)
    cRegister.addOne(5)
    cRegister.addOne(5)
    cRegister.addOne(1)

    const price = 89
    const payment = 100

    var transaction = cRegister.transact(price, payment)

    it ('returns change using nickels', function(){
      assert.equal(transaction[5], 2)
      assert.equal(transaction[10], 0)
    })
  })

  describe('In a transaction with insufficient funds in the drawer', function(){
    const price = 100000
    const payment = 90000
    var cRegister = new CashRegister(1)
    assertInvalidTransaction(cRegister,price,payment)
  })

  describe('In a transaction with insufficient change in the drawer', function(){
    const price = 99
    const payment = 100

    var cRegister = new CashRegister(0)
    cRegister.addOne(2000)

    assertInvalidTransaction(cRegister,price,payment)
  })

  describe('In a transaction with an insufficient payment', function(){
    const price = 200
    const payment = 100
    var cRegister = new CashRegister(10)
    assertInvalidTransaction(cRegister,price,payment)
  })

  describe('In a transaction with a negative payment', function(){
    const price = 100
    const payment = -100
    var cRegister = new CashRegister(10)
    assertInvalidTransaction(cRegister,price,payment)
  })

  describe('In a transaction with a negative price', function(){
    const price = -100
    const payment = 100
    var cRegister = new CashRegister(10)
    assertInvalidTransaction(cRegister,price,payment)
  })

})

function assertInvalidTransaction(cRegister,price,payment){
  var initialTotal = cRegister.totalValue
  var transaction = cRegister.transact(price, payment)

  it ('returns an error', function(){
    assert.isNotOk(transaction)
  })

  it ('does not modify the drawer', function(){
    assert.equal(cRegister.totalValue, initialTotal)
  })
}
