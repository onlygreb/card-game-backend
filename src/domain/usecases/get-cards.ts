import { UseCaseResponse } from "./protocols-usecases";

export interface GetCards{
    get(filters: Record<string, any>): Promise<UseCaseResponse>;
}