import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesControllers';

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('users/me', UsersController.getMe);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/connect', AuthController.getConnect);
router.post('/connect', FilesController.postUpload);

export default router;
