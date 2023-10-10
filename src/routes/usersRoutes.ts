import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUserPatch, updateUserPut } from '../controller/usersController';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/users/', verifyToken, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);
router.put('/users/:id', verifyToken, updateUserPut);
router.patch('/users/:id', verifyToken, updateUserPatch);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;
