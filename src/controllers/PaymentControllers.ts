import { Request,Response,NextFunction, response } from "express";
import APIError from "../errors/APIError";
import {Payment} from "@prisma/client";
import {prisma} from "../app";

export const CreatePayment=async(req:Request,res:Response,next:NextFunction)=>{
    const PaymentData:Payment=req.body
    try{
        await prisma.payment.create({
            data:PaymentData,
        });
    res.status(200).json({
        message:"Payment Done Successfully",
        paymentInfo:PaymentData,
    })
    }catch(error){
        
        next(APIError.internalServerError("Payment Failed"))
    }
};
export const GetPayment=async(req:Request,res:Response,next:NextFunction)=>{
    const PaymentId=String(req.params.id)
    try{
        const PaymentData=await prisma.payment.findUnique({
            where:{
                id:PaymentId,
            }
        });
    res.status(200).json({
        message:"Payment Found Successfully",
        paymentData:PaymentData,
    })
    }catch(error){
        
        next(APIError.internalServerError("Payment Record Not Found"))
    }
};

export const GetAllPayment=async(req:Request,res:Response,next:NextFunction)=>{
    const PaymentId=Number(req.params.id)
    try{
        const PaymentData=await prisma.payment.findMany()
        res.status(200).json({
        message:"Payment Found Successfully",
        paymentData:PaymentData,
    })
    }catch(error){
        next(APIError.internalServerError("Payment Record Not Found"))
    }
};
export const UpdatePayment=async(req:Request,res:Response,next:NextFunction)=>{
    const PaymentId=String(req.params.id);
    const UpdatedPayment:Payment=req.body;
    try{
        await prisma.payment.update({
                where:{
                    id:PaymentId
                },
                data:UpdatedPayment,
        });
        res.status(200).json({
            message:"Payment Updated Successfully",
            PaymentInfo:UpdatedPayment
        })
    }
    catch(error)
    {
        next(APIError.badRequest("Sorry Payment Not Updated"))
    }
};

export const DeletePayment=async(req:Request,res:Response,next:NextFunction)=>{
    const PaymentId=String(req.params.id)
    try{
        await prisma.payment.delete({
            where:{
                id:PaymentId
            },
        });
        res.status(200).json({
            message:"Payment Deleted Successfully",
            InfoDeleted:PaymentId
        })
    }
    catch(error)
    {
        next(APIError.badRequest("Payment Record Not Found. Can't be deleted"))
    }
};
    
