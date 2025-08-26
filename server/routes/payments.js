import express from 'express';
import paymentController from '../Controllers/paymentController.js';  // Con extensión .js

const router = express.Router();

// POST /paymentController/approvePendingPayment
router.post('/approvePendingPayment', paymentController.approvePendingPayment);

// POST /paymentController/rejectPendingPayment
router.post('/rejectPendingPayment', paymentController.rejectPendingPayment);

// getPendingPaymentDetails
router.get('/getPendingPaymentDetails', paymentController.getPendingPaymentDetails);

// sendInvoiceEmail
router.post('/sendInvoiceEmail', paymentController.sendInvoiceEmail);

export default router;

