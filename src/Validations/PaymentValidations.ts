import { Payment } from "@prisma/client";
import { Request, Response, NextFunction } from "express"
import APIError from "../errors/APIError";

const PaymentFormValidations=(req:Request,res:Response,next:NextFunction)=>{
    const paymentData:Payment=req.body

    const {price}=paymentData;
    if(price!=500)
    {
        next(APIError.badRequest('Payment Should Exactly Be Rs.500'));
        return;
    }
    next();
};

export default PaymentFormValidations;