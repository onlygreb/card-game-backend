import { Request, Response, NextFunction } from "express";

// CORS allowing connections from any origin, using any headers or methods.
export const cors = (req: Request, res: Response, next: NextFunction): void => {
    res.set('access-control-allow-origin', '');
    res.set('access-control-allow-headers', '');
    res.set('access-control-allow-methods', '*');
    next();
}