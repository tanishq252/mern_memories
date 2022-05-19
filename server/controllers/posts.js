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
