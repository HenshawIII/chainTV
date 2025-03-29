
import bcrypt from "bcryptjs"

const hashPassword = (password) =>{
    return new Promise((res,rej)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if (err){
                rej(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    rej(err)
                }
                res(hash)
        })
        })
    })
}

const comparePass = (password,hashed)=>{
    return bcrypt.compare(password,hashed)
}

export {hashPassword,comparePass}