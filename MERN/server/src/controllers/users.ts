import express from 'express';
import { deleteUserById, getUsers } from '../db/users';

export const getAllUsers = async (req:express.Request,res:express.Response)=>{
    try{
        const allUsers = await getUsers();
        return res.json(allUsers);

    }catch(error){
        console.log("error in the get all users");
        console.log(error)
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        const deleteduser = await deleteUserById(id);
        return res.json(deleteUser);

    }catch(error){
        console.log("error in the deleting a user");
        console.log(error)
        return res.sendStatus(400);
    }
}