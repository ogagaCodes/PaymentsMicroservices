exports.checkBalance = async (depositAmount, balance)=> {
   return depositAmount && balance && depositAmount > balance
}