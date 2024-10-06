import express from 'express';
import authRouter from './auth-route';
import friendRoute from './friend-route';

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
];

defaultRoute.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
