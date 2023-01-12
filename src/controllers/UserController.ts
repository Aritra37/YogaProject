import { Request,Response,NextFunction} from "express";
import APIError from "../errors/APIError";
import { User } from "@prisma/client";
import {prisma} from "../app";

export const createUser = async (req: Request, res: Response, next: NextFunction) =>{
    const userData:User = req.body;
    try {
        await prisma.user.create({
            data:userData,
        });
        res.status(201).json({
            message: "User created Successfully",
            user: userData,
        })

    }
    catch (error) {
        console.log(error)
        next(APIError.internalServerError("Something went Wrong"));
    }
};
export const getUser=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const userId=String(req.params.id);
    try{
        const user=await prisma.user.findUnique({
            where:{
            id: userId
            }
        })
        res.status(200).json({
            message:"User Found",
            user:user
        })
    }catch(error){
        next(APIError.badRequest("User Not Found"))
    }
};
export const getAllUser = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const users = await prisma.user.findMany()
      res.status (200).json ({
        users
      })
    } catch (error) {
        console.log(error);
      next (APIError.badRequest("Users not found"));
    }
  };
export const updateUser=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const id = String(req.params.id);
        const updatedUserData:User = req.body;
        const user = await prisma.user.update({
        where: {
            id:id,
        },
        data: updatedUserData,
    });
        res.status(200).json({
            message:"Updated Successfully",
            user:user
        })
    }catch(error){
        next(APIError.badRequest("User Not Found!"))
    }
};
export const deleteUser=async(req:Request,res:Response,next:NextFunction)=>{
    const userId=String(req.params.id);
    try{
        const user=await prisma.user.delete({
            where:{
            id: userId
            }
        })
        res.status(200).json({
            message:"User Deleted Successfully ",
            user:user
        })
    }catch(error){
        next(APIError.badRequest("User Not Found!"))
    }  
};

