import express from 'express';
import { FriendController } from '../controllers/friend-controller.js';
const router = express.Router();

router.route('/add').post(FriendController.add);
router.route('/accept').patch(FriendController.accept);
router.route('/list/:userId').get(FriendController.list);
router.route('/search/:userId').get(FriendController.searchFriend);
router.route('/pending/:userId').get(FriendController.pendingRequest);
router.route('/:userId').get(FriendController.userInfo);

export default router;
