import { HttpResponse } from "../../presentation/protocols";

// Commom use case response.
export interface UseCaseResponse{
    result?: HttpResponse,
    error?: HttpResponse,
}