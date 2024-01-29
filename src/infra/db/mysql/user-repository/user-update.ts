import { Repository } from "typeorm";
import { UpdateUserRepository } from "../../../../data/protocols";
import { User } from "../../../../domain/entities";
import { MySQLHelper } from "../helpers/mysql-helper";

// Object to interact directly to the MySQL database in order to update the user.
export class UpdateUserMySQLRepository implements UpdateUserRepository {
    async update(user: User): Promise<User> {
        const userRepository = MySQLHelper.getEntityRepository(User) as Repository<User>;

        const result = await userRepository.save(user);
        return result;
    }
}