import { UserDTO } from "../../domain/usecases";
import { User } from "../../domain/entities";

export interface AddUserRepository {
    add(userData: UserDTO): Promise<User>;
}
