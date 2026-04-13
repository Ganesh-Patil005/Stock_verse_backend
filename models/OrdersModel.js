const  mongoose  = require("mongoose");
const { Schema } = mongoose;


const OrdersSchema = new Schema({
    name: String,
    qty : Number,
    price: Number,
    mode : String,
 
});


const OrdersModel =  mongoose.model("order", OrdersSchema); // ✅ No 'new' keyword

module.exports = OrdersModel; 
