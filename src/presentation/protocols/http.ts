// Interface to padronize all Responses.
export interface HttpResponse {
    statusCode: number
    body: any
}

// Interface to padronize all Requests.
export interface HttpRequest {
    body?: any
    params?: any
    query?: any
}