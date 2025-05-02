const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({

    bookid: {type:String, required: true, unique: true},
    title: String , 
    genre:String  ,
    publishYear: Number ,
    authorId :{type:String, required: true},
  
    availbleCopies:Number

     })

     module.exports = mongoose.model("Book", BookSchema);
