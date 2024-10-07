import express from 'express';
import authRouter from './auth-route';
import friendRoute from './friend-route';
import messageRoute from './message-route';

const router = express();

const defaultRoute = [
	{
		path: '/auth',
		route: authRouter,
	},
	{
		path: '/friend',
		route: friendRoute,
	},
	{
		path: '/message',
		route: messageRoute,
	},
];

defaultRoute.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
