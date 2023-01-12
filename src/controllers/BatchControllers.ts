import { Request,Response,NextFunction } from "express";
import APIError from "../errors/APIError";
import {prisma} from "../app";
import {Batch} from "@prisma/client"

export const CreateBatch=async(req:Request,res:Response,next:NextFunction)=>{
    const BatchData:Batch = req.body
    try{
        await prisma.batch.create({
            data:BatchData,
        });
        res.status(201).json({
            message:"Batch Created Successfully",
            user:BatchData,
        })
    }catch(error){
        next(APIError.internalServerError("Batch Not Created"))
    }
};
export const getBatch=async(req:Request,res:Response,next:NextFunction)=>{
    const batchId=String(req.params.id);
    try{
        const batch=await prisma.user.findUnique({
            where:{
            id: batchId
            }
        })
        res.status(200).json({
            message:"Batch Found",
            user:batch
        })
    }catch(error){
        next(APIError.badRequest("Batch Not Found"))
    }
};
export const getAllBatch = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const batches = await prisma.batch.findMany()
      res.status (200).json ({
        batches
      })
    } catch (error) {
        console.log(error);
      next (APIError.badRequest("Batch not found"));
    }
  };
export const updateBatch=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id = String(req.params.id);
        const updatedBatchData = req.body;
        const user = await prisma.batch.update({
        where: {
            id:id,
        },
        data: updatedBatchData,
    });
        res.status(200).json({
            message:"Batch Updated Successfully",
            user:user
        })
    }catch(error){
        next(APIError.badRequest("Batch Not Found"))
    }
};

export const incrementBatch=async(req:Request,res:Response,next:NextFunction)=>{
    const batchId=String(req.params.id);
    try{
        const found=await prisma.batch.findUnique({
            where:{
            id: batchId
            }
        })
        if(found?.batch_capacity_current==found?.batch_capacity_max)
        {
            next(APIError.badRequest("Batch Filled Already"))
        }
        else
        {
            const batchupdate=await prisma.batch.update({
                where:{
                    id:batchId
                },
                data: {batch_capacity_current:{increment:1}},
            });
        }

    }
    catch(error){
        next(APIError.badRequest("Batch Not Found"))
    }
};

export const deleteBatch=async(req:Request,res:Response,next:NextFunction)=>{
    const batchId=String(req.params.id);
    try{
        const batch=await prisma.batch.delete({
            where:{
            id: batchId
            }
        });
        res.status(200).json({
            message:"Batch Deleted Successfully ",
            batch:batch
        })
    }catch(error){
        next(APIError.badRequest("Batch Not Found!"))
    }  
};
// export const decrementBatch=async(req:Request,res:Response,next:NextFunction)=>{
//     const batchId=Number(req.params.id);
//     try{
//         const found=await prisma.batch.findUnique({
//             where:{
//             id: batchId
//             }
//         })
//     }
//     catch(error){
//         next(APIError.badRequest("Batch Not Found"))
//     }
// };

        