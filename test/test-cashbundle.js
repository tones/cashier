var _ = require('lodash')
var chai = require('chai')
var assert = chai.assert;
const Config = require('../config.js')
const CashBundle = require('../models/cashbundle.js')

describe('CashBundle:', function() {
  describe('When initialized with no parameters', function() {
    var cbundle = new CashBundle()

    it('has a total value of zero', function(){
      assert.equal(cbundle.totalValue(), 0)
    })

    it('has no bills of any denomination', function(){
      Config.denominations.forEach(function(denom){
        assert.equal(cbundle.quantities[denom], 0)
      })
    })
  })

  describe('When initialized with an initialCount of 10', function() {
    var cbundle = new CashBundle(10)

    it('has the correct total value', function(){
      var expectedTotal = _(Config.denominations).map(n => n * 10).sum()
      assert.equal(cbundle.totalValue(), expectedTotal)
    })

    it('has 10 bills of each denomination', function(){
      Config.denominations.forEach(function(denom){
        assert.equal(cbundle.quantities[denom], 10)
      })
    })

    it('can add a bill', function(){
      var denom = Config.denominations[0]
      cbundle.addBill(denom)
      assert.equal(cbundle.quantities[denom], 11)
    })

    it('can remove a bill', function(){
      var denom = Config.denominations[0]
      cbundle.removeBill(denom)
      assert.equal(cbundle.quantities[denom], 10)
    })

    it('can add a new cash value', function(){
      const valueToAdd = 12345
      var originalTotal = cbundle.totalValue()
      cbundle.addValue(valueToAdd)
      assert.equal(cbundle.totalValue(), originalTotal + valueToAdd)
    })
  })

})
