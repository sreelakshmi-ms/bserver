// create a model

// import mongoose
const mongoose=require('mongoose')

// define schema- fields and values model(collection)
const usersSchema=new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})

// model- collection name
const users=new mongoose.model("users",usersSchema)

// export model- to import in another file
module.exports=users