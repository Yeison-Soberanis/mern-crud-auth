import mongoose from "mongoose";

'   fazt           '

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: false,
        trim: true, // remove spaces
    },
    email:{
        type : String,
        required: true,
        trim: true, 
        unique: true,
    },
    password:{
        type : String,
        required: true,
    },
}, {
    timestamps: true
}) 

export default mongoose.model('User', userSchema);