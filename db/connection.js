const mongoose=require('mongoose')

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("_________________Mongodb Atlas Connected________________");
}).catch(()=>{
    console.log("_________________Mongodb Atlas not Connected_________________");
})