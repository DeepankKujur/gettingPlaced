import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name'],
        minLength:[3,"Name must contain at least 3 characters"],
        maxLength:[30,"Name cannot exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        validate:[validator.isEmail,'Please provide a valid email']
    },
    phone:{
        type:Number,
        required:[true,'Please provide your phone number'],
    },
    password:{
        type:String,
        required:[true,'Please provide your password'],
        minLength:[8,"Password must contain at least 8 characters"],
        maxLength:[32,"Password cannot exceed 32 characters"],
        select:false //response me password show nhi hoga while GET method
    },
    role:{
        type:String,
        required:[true,'Please provide your role'],
        enum:['Job Seeker','Employer'],//enum takes care of roles shouldn't be other than the ele in array
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


//hashing the password
userSchema.pre("save",async function(next) {//before saving userSchema run async fn
    if(!this.isModified("password")){
        next()
    }
    //else
    this.password=await bcrypt.hash(this.password,10)
})

//comparing password
userSchema.methods.comparePassword=async function (enteredPassword) {//methods hoga not method
    return await bcrypt.compare(enteredPassword,this.password)
}

//jwt token generate for authorization
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
export const User=mongoose.model("User",userSchema)