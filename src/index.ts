import type { Request, Response } from 'express';
import express from 'express';
import router from './routers';
import { errorHandler } from './middlewares/error';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

app.use(router);
app.use(errorHandler);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
