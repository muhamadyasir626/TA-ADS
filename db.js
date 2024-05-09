const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/sneakerscout");

//cek db connected or not
connect.then(() => {
  console.log("Berhasil woi");
})
  .catch(() => {
    console.log("benerin woi");
  });

const user = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
 
  
});

const collection = new mongoose.model("user", user);

module.exports = collection;


