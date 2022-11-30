import mongoose from 'mongoose';
import User from '../models/user.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const key = "cfg";

export const signIn = async(req, res) => {
    const {email, password} = req.body;

    try{
        const oldUser = await User.findOne({email: email});

        if(!oldUser) return res.status(404).json({message:"User doesn't exist"});

        if(oldUser.password!==password) return res.status(404).json({message:"Wrong Password"});

        res.status(200).json(oldUser);

    }catch(e){
        res.status(500).json({ message:"something went wrong"});
    }
}

export const signUp = async(req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try{
        const isUser = await User.findOne({email:email});

        if(isUser) res.status(400).json({message: "User already exists"});

        // const newPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email: email,
            password: password,
            name: `${firstName} ${lastName}`
        });

        // const token = jwt.sign({email: result.email, id: result._id}, key, { expiresIn: "1h" });
        
        // console.log(result, token);

        res.status(200).json(result);

    }catch(e){

        // res.status(500).json({message: "Something went wrong"});
        console.log(e);
    }
}