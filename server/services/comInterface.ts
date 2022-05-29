import { Request } from 'express';

export interface IUserAuthInfoRequest extends Request {
    session: any // or any other type
}
