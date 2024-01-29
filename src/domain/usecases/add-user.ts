import { UseCaseResponse } from "./protocols-usecases";

export interface UserDTO {
    email: string;
    userName: string;
    password: string;
}

export interface AddUser {
    add(user: UserDTO): Promise<UseCaseResponse>;
}