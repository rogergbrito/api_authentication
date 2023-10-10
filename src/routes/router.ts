import express from 'express';
import usersRoutes from './usersRoutes';
import loginRoutes from './loginRoutes';
import signupRouter from './signupRoutes';

const router = express.Router();

// users
router.use('/', usersRoutes);

// signup
router.use('/', signupRouter);

// login
router.use('/', loginRoutes);

export default router;