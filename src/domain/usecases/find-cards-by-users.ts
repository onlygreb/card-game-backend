import { UseCaseResponse } from "./protocols-usecases";

export interface FindCardsByUser {
    find(userUuid: string): Promise<UseCaseResponse>;
}