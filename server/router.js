import { Router } from "express";

const router = Router();

import noticeController from "./routes/notices.js";
import authController from "./routes/auth.js";
import paymentsController from "./routes/payments.js";
import userController from "./routes/user.js";

router.use("/noticeController", noticeController);
router.use("/authcontroller", authController);
router.use("/paymentController", paymentsController);
router.use("/userController", userController);



export default router;
