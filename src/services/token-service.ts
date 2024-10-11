import jwt from 'jsonwebtoken';
import configs from '../configs';
import { Response } from '../models/auth-model';

const secretKey = configs.jwt.secret!;

export const generateToken = (user: Response) => {
    const payload = {
        id: user.id,
        name: user.name,
        username: user.username
    }

    return jwt.sign(payload, secretKey,  {expiresIn: '2h'})
}

