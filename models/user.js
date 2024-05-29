const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/expensetracker");

const userSchema=mongoose.Schema({
item:String,
amount:Number,

})

module.exports=mongoose.model("expense", userSchema);