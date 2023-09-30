const users = require("../models/collections")
const jwt = require('jsonwebtoken')

// sign up- account creation
register = (req, res) => {

    // // acno=req.body.acno
    // const {acno}=req.body
    // // psw=req.body.psw
    // const {psw}=req.body
    // // uname=req.body.uname
    // const {uname}=req.body

    // destructuring
    const { acno, psw, uname } = req.body

    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(400).json({
                message: "user already exist",
                status: false,
                statusCode: 400,
            })
        }
        else {
            // create object for user
            let newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })
            newUser.save()
            res.status(201).json({
                message: "Account created succesfully",
                status: true,
                statusCode: 201
            })
        }
    })
}

login = (req, res) => {
    // access data from request body
    const { acno, psw } = req.body

    users.findOne({ acno, psw }).then(user => {
        if (user) {
            // token generation
            const token = jwt.sign({ acno }, "secretkey123")

            res.status(200).json({
                message: "Login succes",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token
            })
        }
        else {
            res.status(404).json({
                message: "Incorrect account number or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: "user not present",
                status: false,
                statusCode: 404
            })
        }
    })
}

moneyTransfer = (req, res) => {
    const { sAcno, rAcno, amount, psw, date } = req.body
    // convert amount to number
    var amnt = parseInt(amount)
    users.findOne({ acno: sAcno, psw }).then(suser => {
        if (suser) {
            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    if (amnt <= suser.balance) {

                        // update sender object
                        suser.balance = suser.balance - amnt
                        suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
                        suser.save()

                        // update receiver object
                        ruser.balance = ruser.balance + amnt
                        ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
                        ruser.save()

                        res.status(200).json({
                            message: "Transaction succesful",
                            status: true,
                            statusCode: 200,
                        })


                    }
                    else {
                        res.status(404).json({
                            message: "Insufficient balance",
                            status: false,
                            statusCode: 404
                        })

                    }
                }
                else {
                    res.status(404).json({
                        message: "Invalid credit credentials",
                        status: false,
                        statusCode: 404
                    })

                }
            })
        }
        else {
            res.status(404).json({
                message: "Invalid debit credentials",
                status: false,
                statusCode: 404
            })
        }
    })
}

accountStatement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200,
            })
        }
        else {
            res.status(404).json({
                message: "User not present",
                status: false,
                statusCode: 404
            })
        }
    })
}


accountDelete = (req, res) => {
    const { acno } = req.params
    users.deleteOne({ acno }).then(data => {
        if (data) {
            res.status(200).json({
                message: "account deleted successfully",
                status: true,
                statusCode: 200
            })
        }
    })
}


// exporting register() function
module.exports = { register, login, getBalance, moneyTransfer, accountStatement, accountDelete }