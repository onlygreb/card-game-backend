import { User } from "../../domain/entities";

export interface UpdateUserRepository {
    update(user: User): Promise<User>;
}