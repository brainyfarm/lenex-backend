import express from 'express';

import * as Handlers from '../controllers/Index';

const router = express.Router();

router.get('/user', Handlers.User.home);
router.post('/user', Handlers.User.register);

export default router;