import { Router } from 'express';
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';
import serviceRouter from '../routers/service.router';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

router.use('/service', serviceRouter);

export default router;
