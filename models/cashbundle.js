var _ = require('lodash')
const Config = require('../config.js')

/**
 * Represents a collection of bills.
 * @constructor
 * @param {number} [initialCount=0] - Number of bills (per denomination) to include
 */
var CashBundle = function(initialCount){
  var _this = this
  var initialCount = initialCount || 0

  this.quantities = new Map()
  Config.denominations.forEach(function(d){
    _this.quantities[d] = initialCount
  })
}

/**
 * Calculate the total value of the current bundle.
 * @return {number}
 */
CashBundle.prototype.totalValue = function(){
  return _(this.quantities).map(_.multiply).sum()
}

/**
 * Adds value to the current bundle.
 * Used to add a payment to the cash drawer.
 * Assumes the most efficient distribution of denominations.
 * @param {number} value - Value to be added
*/
CashBundle.prototype.addValue = function(value){
  var _this = this
  var remaining = value

  Config.denominations.forEach(function(denom){
    while (remaining >= denom){
      _this.addBill(denom)
      remaining -= denom
    }
  })
}

/**
 * Add a single bill of a given denomination.
 * (Note that "coins" like nickels and quarters are considered "bills".)
 * @param {number} denom - Denomination to add
 */
CashBundle.prototype.addBill = function(denom){
  this.quantities[denom]++
}

/**
 * Remove a single bill of a given denomination.
 * (Note that "coins" like nickels and quarters are considered "bills".)
 * @param {number} denom - Denomination to remove
 */
CashBundle.prototype.removeBill = function(denom){
  this.quantities[denom]--
}

/**
 * Create and return a copy of this CashBundle
 * @returns {CashBundle}
 */
CashBundle.prototype.backup = function(){
  var backup = new CashBundle
  backup.quantities = _.clone(this.quantities)
  return backup
}


module.exports = CashBundle
