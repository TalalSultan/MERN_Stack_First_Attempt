import express from 'express';
import {get, merge} from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        //get the sessionToken generated when login
        const sessionToken = req.cookies['talal-auth'];
        if(!sessionToken){
            return res.sendStatus(403);
        }

        //check if there is even a user
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, {identity:existingUser});
        return next();
        


    }catch(error){
        console.log("Error");
        console.log(error);
        return res.sendStatus(400);
    }

}