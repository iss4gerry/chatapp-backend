import express from 'express';
import authRouter from './auth-route';

const router = express();

const defaultRoute = [
	{
		path: '/auth',
		route: authRouter,
	},
];

defaultRoute.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
