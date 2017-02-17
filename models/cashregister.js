const Config = require('../config.js')
const CashBundle = require('./cashbundle.js')

/**
 * Manages primary transaction logic.
 * @constructor
 * @param {number} [initialCount=0] - Number of bills (per denomination) to include in the drawer
*/
var CashRegister = function(initialCount){
  var initialCount = initialCount || 0
  this.drawer = new CashBundle(initialCount)
}

/**
 * Primary transaction logic.
 * Attempts to make change, adjusting the drawer's contents if appropriate.
 * @param {number} price - The purchase price
 * @param {number} payment - The payment amount
 * @returns {CashBundle|boolean} - Returns a CashBundle of change, or false if the transaction fails.
 *
 */
CashRegister.prototype.transact = function(price, payment){
  // ensure values are not negative
  if ((price < 0) || (payment < 0)){ return false }

  // operate on a copy of the drawer
  // do not save changes to the "real" drawer unless the transaction succeeds
  var backupDrawer = this.drawer.backup()

  // add the payment to the drawer
  backupDrawer.addValue(payment)

  // attempt to make change
  var changeBundle = new CashBundle()
  var remaining = payment - price
  Config.denominations.forEach(function(denom){
    while ((remaining >= denom) && (backupDrawer.quantities[denom] > 0)){
      backupDrawer.removeBill(denom)
      changeBundle.addBill(denom)
      remaining -= denom
    }
  })

  // return results
  if (changeBundle.totalValue() == (payment - price)){
    this.drawer = backupDrawer
    return changeBundle
  } else {
    return false
  }
}

/**
 * Shorthand for drawer.totalValue
 * @return {number}
 */
CashRegister.prototype.totalValue = function(){
  return this.drawer.totalValue()
}



module.exports = CashRegister
