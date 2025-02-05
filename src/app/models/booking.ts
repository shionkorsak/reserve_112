import mongoose from "mongoose";

const booking = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true},
    id: {type:String, required:true},
    amount: {type:Number, required:true},
    date: {type:Date, required:true},
    time: {type:[String], required:true},
});

export default mongoose.models.Booking || mongoose.model('Booking', booking);
