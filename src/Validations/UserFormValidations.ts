import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express"
import ApiError from "../errors/APIError";

const UserFormValidation = (req: Request, res: Response, next:NextFunction) => {
    const userData: User = req.body;
    
    const { Age } = userData;

    // age limit
    if (Age < 18 || Age > 65) {
        next(ApiError.badRequest('Age limit is between 18 - 65'));
        return;
    }
    next();
}

export default UserFormValidation;
