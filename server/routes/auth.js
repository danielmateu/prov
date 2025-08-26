import express from 'express';
import authController from '../Controllers/authController.js';


const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/registerUser", authController.registerUser);
router.post("/createCallcenterUser", authController.createCallcenterUser);

router.get("/getDocumentTypes", authController.getDocumentTypes);

// requestPasswordReset
router.post("/requestPasswordReset", authController.requestPasswordReset);
// resetPassword
router.post("/resetPassword/:token", authController.resetPassword);
// verifyEmail
router.post("/verifyEmail/:token", authController.verifyEmail);

export default router;
