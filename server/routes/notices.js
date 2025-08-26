import express from 'express';
import noticeController from '../Controllers/noticesController.js';


const router = express.Router();

// New Notices
router.get("/getLeadSuppliers", noticeController.getLeadSuppliers);
router.get("/getStatus", noticeController.getStatus);
router.get("/getReasons", noticeController.getReasons);
router.get("/getPrefixes", noticeController.getPrefixes);

router.get("/getZIPCodes", noticeController.getZIPCodes)

router.get("/getBrands", noticeController.getBrands);
router.get("/getApparatus", noticeController.getApparatus);
router.get("/getType", noticeController.getTypes);
// crear cliente
router.post("/createCustomer", noticeController.createCustomer);
// actualizar cliente
router.post("/updateCustomer", noticeController.updateCustomer);
// router.post("/updateBillingData", noticeController.updateBillingData);

router.get("/getDataCustomer", noticeController.getDataCustomer);

// insertExternalNotice
router.post("/insertExternalNotice", noticeController.insertExternalNotice);
router.get("/getEx_InvoicingAddressByEmail", noticeController.getEx_InvoicingAddressByEmail);
router.post("/updateFiscalData", noticeController.updateFiscalData);
// Get external notices
// router.get("/getNoticesByExternalLoginID", noticeController.getNoticesByExternalLoginID);
router.get('/getNoticesByExternalLoginID/:externalLoginID', noticeController.getNoticesByExternalLoginID);
router.get('/by-invoicing-address/:Ex_InvoicingAddressID', noticeController.getNoticesByEx_InvoicingAddressID);
// getAllNotices
router.get('/getAllNotices', noticeController.getAllNotices);

router.get('/getCustomersByExternalLoginID/:externalLoginID', noticeController.getCustomersByExternalLoginID);

// getEx_Status
router.get("/getEx_Status", noticeController.getEx_Status);
// getEx_InvoicingAddress
router.get("/getEx_InvoicingAddress", noticeController.getEx_InvoicingAddress);
// get_Ex_PendingPayments
router.get("/get_Ex_PendingPayments", noticeController.get_Ex_PendingPayments);
router.get("/getPendingPaymentDetails", noticeController.getPendingPaymentDetails);

// deleteNotice
router.post("/deleteNotice", noticeController.deleteNotice);
// updateNotice
router.post("/updateNoticeStatus", noticeController.updateNoticeStatus);

router.get("/searchModelo", noticeController.searchModelo);

// getNoticesByCustomerID
router.get('/getNoticesByCustomerID/:customerId', noticeController.getNoticesByCustomerID);

// submitClaimRequest
router.post('/submitClaimRequest', noticeController.submitClaimRequest);

// accountingClaimRequest
router.post('/accountingClaimRequest', noticeController.accountingClaimRequest);

// submitConsultationRequest
router.post('/submitConsultationRequest', noticeController.submitConsultationRequest);

// Rutas específicas para callcenter
router.get('/getAllCustomers', noticeController.getAllCustomers);
router.post('/submitCallcenterClaim', noticeController.submitCallcenterClaim);
router.post('/submitCallcenterAccounting', noticeController.submitCallcenterAccounting);
router.post('/submitCallcenterConsultation', noticeController.submitCallcenterConsultation);

export default router;

