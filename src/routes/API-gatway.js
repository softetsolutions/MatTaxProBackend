import express from 'express';
import userRouter from './userRoutes.js';
import authRouter from './authRouter.js';

const APIrouter = express.Router();
APIrouter.use('/v1/users', userRouter);
APIrouter.use('/user', authRouter);


export default APIrouter;
