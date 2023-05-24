import bcrypt from 'bcrypt';

export const hash_pass=(password)=>{
return bcrypt.hash(password,10)
}

export const verification=(simplePassword,hashpassword)=>{
    return bcrypt.compare(simplePassword,hashpassword)
}