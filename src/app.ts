import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request,Response} from 'express';
import  UserRoutes  from './routes/userroutes';
import BatchRoutes from './routes/batchroutes'
import PaymentRoutes from './routes/paymentroutes'
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors'
import errorHandler from './errors/ErrorHandler';
const app=express();

const PORT=3000;

export const prisma=new PrismaClient();

//compresses all the responses
app.use(compression());

//makes the headers security
app.use(helmet());
//cross origin resource sharing (helps in cross policy resource sharing)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get ("/", (req : Request, res : Response) => {
    res.send ("API of YOGA FORM!");
});
// user route 
app.use ("/user", UserRoutes);
app.use("/batch",BatchRoutes);
app.use("/payment",PaymentRoutes);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Yoga Server running on port ${PORT}`);
})

export default app;

