import { Request, Response } from "express";
import { HttpRequest, HttpResponse, Controller } from "../../presentation/protocols"

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params ?? '',
            query: req.query ?? ''
        };

        const httpResponse: HttpResponse = await controller.handle(httpRequest);

        return res.status(httpResponse.statusCode).json(httpResponse.body);
    };
}