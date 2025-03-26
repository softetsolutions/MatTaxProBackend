import express from 'express';
import userRouter from './userRoutes.js';
import authRouter from './authRouter.js';

const APIrouter = express.Router();
APIrouter.use('/users', userRouter);
APIrouter.use('/user/jwt', authRouter);


export default APIrouter;
