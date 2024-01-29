import { Repository } from "typeorm";
import { FindUserRepository } from "../../../../data/protocols";
import { User } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to search for a user.
export class FindUserMySQLRepository implements FindUserRepository {
    async find(filters: Record<string, any>, shouldBringPassword: boolean = false): Promise<User> {
        const userRepository = MySQLHelper.getEntityRepository(User) as Repository<User>;

        const selectFields = {
            uuid: true,
            coins: true,
            email: true,
            userName: true,
            createdAt: true,
            updatedAt: true
        };

        if (shouldBringPassword) Object.assign(selectFields, { password: true });

        const result = await userRepository.findOne({ where: filters, select: selectFields });
        return result;
    }
}