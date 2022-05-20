import mongoose from 'mongoose';
import PostMessage from '../models/posts.js'

// read
export const getPosts = async (req, res) =>{
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

// create
export const createPost = async (req, res) => {
    
    const newPost = PostMessage(req.body);

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(e){
        res.status(404).json({message: e.message});
    }
}

// update
export const updatePost = async (req, res) => {

    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).json({message: 'No post with given id exists'}); 

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true});

    res.json(updatePost);

}
