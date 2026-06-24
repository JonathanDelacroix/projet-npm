import express from 'express';
import * as woodController from '../controllers/wood.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, woodController.readAll);
router.get("/:hardness", auth, woodController.readByHardness);

export default router;