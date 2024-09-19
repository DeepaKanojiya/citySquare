const mongoose = require("mongoose")
require("dotenv").config();

// const mongoURL = process.env.MONGODB_URL;
const mongoURL  = process.env.MONGODBURL_LOCAL;
async function main(){

await mongoose.connect(mongoURL);
 }
main()
.then(()=>{
  console.log("connected mongodb server")
})
.catch((err)=>{
  console.log("connection failed", err);
})


const db = mongoose.connection;

db.on('disconnected', ()=>{
  console.log('Mongodb server disconnected')
})

module.export = db;