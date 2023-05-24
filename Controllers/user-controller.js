import { User } from "../models/user";

export const signup=async (req,res)=>{
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
const user=await User.create({
    name,
    email,
    phoneNumber,
    password
})
}