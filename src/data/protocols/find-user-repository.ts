import { User } from "../../domain/entities";

export interface FindUserRepository {
    find(filters: Record<string, any>, shouldBringPassword?: boolean): Promise<User>;
}