const mongoose = require("mongoose")

const BookShopSchema = new mongoose.Schema({

    shopID: {type:String, required: true, unique: true},
    name: String , 
    location: String , 
    booksAvailable: [String] ,
    contactNumber:String
     })

    module.exports(mongoose.model("BookShop",BookShopSchema))