import express from 'express';

import { createUser, getUserByEmail } from '../db/users';//change this to ../db/users if error
import { authentication, random } from '../helpers';//change to ../helpers if error
//this is for login
export const login = async (req:express.Request,res:express.Response)=>{
    try{
        console.log("im in login now");

       const {email,password} = req.body;
       console.log({email,password});

       if(!email||!password){return res.sendStatus(400);}

       const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
       console.log("user is ");
       console.log(user);
       if(!user){
        console.log("no user");
        return res.sendStatus(400);
       }
       //we need to know if the password is currect without knowing the password
       const expectedHash = authentication(user.authentication.salt,password);

       if(user.authentication.password !== expectedHash){
        console.log("wrong password");
        return res.sendStatus(403);
       }
       const salt = random();
       user.authentication.sessionToken = authentication(salt,user._id.toString());
       await user.save();
       res.cookie('talal-auth',user.authentication.sessionToken,{domain:"localhost",path:"/"});
       console.log("success");
       //return res.redirect('/profile/'+user.username);
       return user

    }catch(error){
        console.log("Error");
        console.log(error);
        res.sendStatus(400);
    }

}


//this is for registeration
export const register = async (req:express.Request,res:express.Response)=>{
    try{
        const {email,password,username}=req.body;
        if(!email||!password||!username){
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
     
        if(existingUser){
            console.log("user exist");
            console.log(existingUser);
            return res.sendStatus(400);}
        //if user provided the right credentionals and does not exist then we creat an authentication
        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication:{
                salt,
                password: authentication(salt,password),
            }
        });
        // return res.redirect(200,'/');
        return res.sendStatus(200)


    }catch(error){
        console.log(error);
        // return res.sendStatus(400);
    }
};