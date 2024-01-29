import { HttpResponse } from "../protocols"

// Declaring commom http response messages.

export const badRequest = (error: Error): HttpResponse => {
    return { body: { message: error.message }, statusCode: 400 };
}

export const notFound = (error: Error): HttpResponse => {
    return { body: { message: error.message }, statusCode: 404 };
}

export const created = (data: any): HttpResponse => {
    return { body: data, statusCode: 201 };
}

export const ok = (data: any): HttpResponse => {
    return { body: data, statusCode: 200 };
}

export const serverError = (error: Error): HttpResponse => {
    return { body: { message: error.message }, statusCode: 500 };
}

export const noContent = (data: any): HttpResponse => {
    return { body: data, statusCode: 204 };
}