
const mongoose = require('mongoose');

const sentSchema =new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        imutable:true,
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        imutable:true,
    }
 
 
 },{
    timestamps:true
 });
 
 module.exports = mongoose.model('Sent', sentSchema);