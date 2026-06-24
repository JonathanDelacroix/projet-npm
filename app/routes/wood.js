import express from 'express';
import * as woodController from '../controllers/wood.js';

const router = express.Router();

router.get('/', woodController.getAll);

// GET /wood/:hardness
router.get("/:hardness", woodController.readByHardness);

export default router;