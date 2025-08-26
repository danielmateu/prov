import express from 'express';
import userController from '../Controllers/userController.js';  // Con extensión .js

const router = express.Router();

// Post 
router.post('/updateProfileImage', userController.updateProfileImage);

export default router;