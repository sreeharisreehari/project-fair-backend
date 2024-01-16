// import mangoose
const { default: mongoose } = require('mongoose')
const mangoose =require('mongoose')

// access connection string of mongodb
const connectionstring= process.env.DATABASE

// CONNECT server with the mongodb
mongoose.connect(connectionstring).then((res)=>{
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to:${err}`);
})