import express from 'express';
import userRouter from './userRoutes.js';

const APIrouter = express.Router();
APIrouter.use('/users', userRouter);

export default APIrouter;
