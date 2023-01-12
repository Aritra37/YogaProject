import { Router } from "express";
import * as BatchController from '../controllers/BatchControllers';
// import UserFormValidation from "../Validations/BatchValidations";

const router: Router = Router();

// create batch
router.post('/', BatchController.CreateBatch);

// get all batch
router.get('/', BatchController.getAllBatch);

// get batch
router.get('/:id', BatchController.getBatch);

// patch user
router.patch('/:id', BatchController.incrementBatch);

//for updating on the admin side
router.patch('/admin/:id',BatchController.updateBatch);

//delete batch
router.delete('/:id',BatchController.deleteBatch);

export default router;
