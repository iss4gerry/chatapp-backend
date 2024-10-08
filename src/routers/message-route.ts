import express from 'express';
import { MessageContoller } from '../controllers/message-controller';
const router = express.Router();

router.route('/room/add').post(MessageContoller.addRoom);
router.route('/room/:roomId').get(MessageContoller.getRoom);

export default router;
