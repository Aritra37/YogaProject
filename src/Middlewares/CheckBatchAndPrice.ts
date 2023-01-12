import { Request, Response, NextFunction } from 'express';
import {prisma } from '../app';
import { Batch, Payment } from '@prisma/client';
import ApiError from '../errors/APIError';

const CheckBatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { batchId } = req.body;
    console.log('Batch Id', batchId);
    if (!batchId) next(ApiError.badRequest('Batch Id Required'));

    const batch = await prisma.batch.findUnique({
        where: {
            id: batchId,
        },
    });
    console.log('Batch', batch);
    const { batch_capacity_max, batch_capacity_current, price  } = batch as Batch;
    if (batch_capacity_current + 1 > batch_capacity_max) {
        next(ApiError.badRequest('Batch is full'));
    }

    // Set price that is fetched from batch details
    req.body['price'] = price;

    next();
};

export default CheckBatch;