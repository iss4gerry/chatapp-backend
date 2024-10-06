import express from 'express';
import { FriendController } from '../controllers/friend-controller';
const router = express.Router();

router.route('/add').post(FriendController.add);
router.route('/accept').patch(FriendController.accept);

export default router;
