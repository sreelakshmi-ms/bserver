const express=require('express')
const { register, login ,getBalance, moneyTransfer, accountStatement,accountDelete} = require('../controllers/logic')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

// router object
const router=new express.Router()


// create account- signup
router.post('/bankuser/create_acc',register)

// login
router.post('/bankuser/login',login)

// check balance
router.get('/bankuser/balance/:acno',jwtMiddleware,getBalance)

// money transfer
router.post('/bankuser/money_transfer',jwtMiddleware,moneyTransfer)

// account statement
router.get('/bankuser/account_statement/:acno',jwtMiddleware,accountStatement)

// profile view

// delete account
router.delete('/bankuser/delete-account/:acno',jwtMiddleware,accountDelete)


// export router
module.exports=router
