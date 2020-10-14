import { Request, Response } from 'express';
import { Logger } from 'pino';
import { IOptions } from '../type/passport';
import { IUser } from '../models/user.model';
export interface IContext {
    req: Request;
    res: Response;
    authenticate?: any;
    logger: Logger;
    user: IUser;
}
export declare const Context: {
    logger: Logger;
    authenticate: (key: string, options: IOptions, req: Request, res: Response) => Promise<unknown>;
};
//# sourceMappingURL=Context.d.ts.map