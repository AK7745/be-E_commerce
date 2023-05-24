import { User } from "../models/user.js";
import { hash_pass } from "../helperFunctions/crypt.js";

export const signup=async (req,res)=>{
try {
    const {
        name,
        email,
        phoneNumber,
        password
    }=req.body

    if(!name || !email || !phoneNumber || !password){
        return res.status(400).json({
            success: false,
            message: "the required feild are not denfined",
          });
    }
    const hashPassword=await hash_pass(password)
    const user=await User.create({
        name,
        email,
        phoneNumber,
        password:hashPassword
    })
    console.log(user);
    res.status(200).json({success: true, message:"user created successfully",data: user});
} catch (error) {
    res.status(400).json({success: false, message:"something went wrong"});
    
}
}

// const signIn = async (req, res) => {}