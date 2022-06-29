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

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id} , {new:true});

    res.json(updatePost);
}

// delete
export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({message: 'No post with given id exists'})

    try{
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({message: "successfully deleted!"});

    }catch(e){
        res.status(404).json({message: e});

    }
}

// like (update one)
export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: "unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({message: 'No post with given id exists'}); 

    const post = await PostMessage.findById(id);

    //finding the userId to check whether given user has like the post or not
    const index = await post.likes.findIndex((id) => {
        id === String(req.userId);
    });


    // -1 means the post is not liked 
    if( index === -1){
        // increment the likes count 
        post.likes.push(req.userId);
    }else{
        // remove the person who has disliked
        post.likes = post.likes.filter((id) => 
            id !== String(req.userId)
        )
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likes: post.likes} , {new:true})

    res.json(updatedPost);
}

// /////// additional queries
// // insert
// export const insert = async(req, res) =>{
//     const newPost = PostMessage({
//         title: "trial",
//         message: "trial",
//         creator: "SY7",
//         tags: ["trial", "dbms"],
//         likeCount: 100,
//         createdAt: new Date(),
//     });

//     try{
//         PostMessage.save(newPost);
//         res.status(201).json({message: "inserted"})
//     }catch(e){
//         res.status(404).json({message: e})
//     }
// }
