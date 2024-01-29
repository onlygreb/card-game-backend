import { UseCaseResponse } from "./protocols-usecases";

export interface FindCard {
    find(filters: Record<string, any>): Promise<UseCaseResponse>;
}