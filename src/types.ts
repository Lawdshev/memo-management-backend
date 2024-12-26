import { Request } from 'express';
import { IUser } from './models/user';

export type AuthedRequest = Request & {
    user: IUser
}
