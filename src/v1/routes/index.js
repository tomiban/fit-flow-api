import express from 'express';
import routineRoutes from './routinesRoutes.js';
import usersRoutes from './usersRoutes.js'
const router = express.Router();

router.use('/routines',routineRoutes);
router.use('/users', usersRoutes)


export default router 