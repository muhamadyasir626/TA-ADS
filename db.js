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

const wishlist_schema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  shoeName: String,
  brand: String,
  releaseDate: Date,
  description: String,
  colorway: String,
  make: String,
  retailPrice: Number,
  styleID: String,
  thumbnail: String,
  resellLinks: {
    goat: String,
    flightClub: String,
    stockX: String
  },
  lowestResellPrice: {
    stockX: Number,
    flightClub: Number,
    goat: Number
  }
});

const collection = new mongoose.model("users", user);
const wishlist = new mongoose.model("wishlist", wishlist_schema);

module.exports = collection, wishlist;


