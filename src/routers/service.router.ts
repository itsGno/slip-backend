import { Router } from 'express';
import rescue from 'express-rescue';
import serviceController from '../controllers/service.controller';
import authMiddleware from '../middlewares/auth';

const serviceRouter = Router();

serviceRouter.route('/').get(authMiddleware, rescue(serviceController.getService));


// userRouter.route('/register').post(authMiddleware,rescue(userController.register));


export default serviceRouter;
