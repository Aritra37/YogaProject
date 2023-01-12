import { Router } from "express";
import * as PaymentController from "../controllers/PaymentControllers";
import PaymentFormValidations from "../Validations/PaymentValidations";

const router: Router = Router();

// create payment
router.post('/',PaymentController.CreatePayment);

//get payment
router.get('/admin/:id',PaymentController.GetPayment);

//getAll payment
router.get('/admin',PaymentController.GetAllPayment);

// Update payment
router.patch('/:id', PaymentController.UpdatePayment);

//Delete Payment
router.delete('/:id',PaymentController.DeletePayment);


export default router;
