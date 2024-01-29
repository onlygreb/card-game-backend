import { UseCaseResponse } from "./protocols-usecases";

export interface LoginUser {
    login(userName: string, password: string): Promise<UseCaseResponse>;
}