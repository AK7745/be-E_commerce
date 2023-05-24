import bcrypt from 'bcrypt';

export const hash_pass=(password)=>{
return bcrypt.hash(password,10)
}