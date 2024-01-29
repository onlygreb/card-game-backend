import { HttpResponse, HttpRequest } from './http'

// Default interface to be used on all controllers.
export interface Controller {
    handle(httpRequest?: HttpRequest): Promise<HttpResponse>
}