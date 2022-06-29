import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
import auth from "../middleware/auth"

const router = express.Router();

router.get('/', getPosts)

router.post('/',auth, createPost)

// if aouth is successfull then we can proceed
router.patch('/:id', auth, updatePost)

// if aouth is successfull then we can proceed
router.delete('/:id', auth, deletePost);

router.patch('/:id/likePost',auth, likePost);

export default router;