var _ = require('lodash')
const Config = require('../config.js')

/**
 * Manages primary transaction logic.
 * @constructor
 * @param {number} [initialCount=0] - Number of bills (per denomination) to include in the drawer
*/
var CashRegister = function(initialCount){
  var initialCount = initialCount || 0
  this.drawer = new Map()
  Config.denominations.forEach((d) => {this.drawer[d] = initialCount})
  this.updateTotal()
}

/**
 *  Adds a specified amount of cash to a map of currency denominations
 *  @param {number} value The amount of cash to add, in cents.
 *  @param {map} denomMap The map of denominations. Keys are denomination amounts in cents, values are quantities.
 */
CashRegister.addValueToDenomMap = function(value, denomMap){
  var remaining = value

  Config.denominations.forEach(function(denom){
    while (remaining >= denom){
      denomMap[denom]++
      remaining -= denom
    }
  })
}

/**
 *  Calculates the total value of a map of currency denominations.
 *  @param {map} denomMap The map of denominations. Keys are denomination amounts in cents, values are quantities.
 *  @returns {number} Total value, in cents.
 */
CashRegister.totalValueOfDenomMap = function(denomMap){
  return _(denomMap).map(_.multiply).sum()
}

/**
 * Primary transaction logic.
 * Attempts to make change, adjusting the drawer's contents if appropriate.
 * @param {number} price - The purchase price, in cents.
 * @param {number} payment - The payment amount, in cents.
 * @returns {map|boolean} - Returns a CashBundle of change, or false if the transaction fails.
 *
 */
CashRegister.prototype.transact = function(price, payment){
  // quick-and-dirty input validation
  if ((price < 0) || (payment < 0) || (payment-price <= 0)){ return false }

  // operate on a copy of the drawer
  // (do not save changes to the "real" drawer unless the transaction succeeds)
  var backupDrawer = _.clone(this.drawer)

  // add the payment to the drawer
  CashRegister.addValueToDenomMap(payment, backupDrawer)

  // create an empty map of denominations
  var change = new Map()
  Config.denominations.forEach((d) => {change[d] = 0})

  // attempt to make change
  var remaining = payment - price
  Config.denominations.forEach(function(denom){
    while ((remaining >= denom) && (backupDrawer[denom] > 0)){
      backupDrawer[denom]--
      change[denom]++
      remaining -= denom
    }
  })

  // return results
  var totalChange = CashRegister.totalValueOfDenomMap(change)
  if (totalChange == (payment - price)){
    // the transaction was successful, so modify the drawer and return the change
    this.drawer = backupDrawer
    this.updateTotal()
    return change
  } else {
    // the transaction failed
    return false
  }
}

/**
 * Updates a cashRegister's `total` property
 * Should be called internally any time the drawer's contents are updated.
 */
CashRegister.prototype.updateTotal = function(){
  this.totalValue = CashRegister.totalValueOfDenomMap(this.drawer)
}

/**
 * Add a single bill/coin of a given denomination to the drawer.
 * @param {number} The denomination to be added
 */
CashRegister.prototype.addOne = function(denom){
  this.drawer[denom]++
  this.updateTotal()
}

module.exports = CashRegister
