import express from 'express';
const router = express.Router();

import * as woodController from '../controllers/wood.js';

router.get('/', woodController.getAll);

export default router;