import express from 'express';
import routineRoutes from './routineRoutes.js';

const router = express.Router();

router.use('/routines',routineRoutes);
router.use('/exercises',);
router.use('/users',routineRoutes);
router.use('/categories',routineRoutes);




export default router