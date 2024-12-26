import { Request } from 'express';
import { Schema } from 'mongoose';
import { IUser } from '../models/user';

export type AuthedRequest = Request & {
    user: IUser
}
