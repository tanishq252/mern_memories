import mongoose from 'mongoose';
import User from '../models/user.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const key = process.env.SECRET;

export const signIn = async(req, res) => {
    const {email, password} = req.body;

    try{
        const oldUser = await User.findOne({email: email});

        if(!oldUser) return res.status(404).json({message:"User doesn't exist"});

        const isPassword = await bcrypt.compare(password, oldUser.password);

        if(!isPassword) return res.status(404).json({message: "Password not matching!"});

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, key, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });

    }catch(e){
        res.status(500).json({ message:"something went wrong"});
    }
}

export const signUp = async(req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try{
        const isUser = await User.findOne({email:email});

        if(isUser) res.status(400).json({message: "User already exists"});

        const newPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email: email,
            password: newPassword,
            name: `${firstName} ${lastName}`
        });

        const token = jwt.sign({email: result.email, id: result._id}, key, { expiresIn: "1h" });

        res.status(200).json({result, token});

    }catch(e){

        res.status(500).json({message: "Something went wrong"});
    }
}