import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
// import auth from "../middleware/auth"

const router = express.Router();

router.get('/', getPosts)

router.post('/', createPost)

// if aouth is successfull then we can proceed
router.patch('/:id',  updatePost)

// if aouth is successfull then we can proceed
router.delete('/:id',  deletePost);

router.patch('/:id/likePost', likePost);

export default router;