import { User } from "../../../../domain/entities";
import { v4 as uuidV4 } from "uuid";
import { hashSync } from "bcrypt";
import { AddUserRepository } from "../../../../data/protocols";
import { UserDTO } from "../../../../domain/usecases";
import { MySQLHelper } from "../helpers/mysql-helper";
import { Repository } from "typeorm";

// Object to interact directly to the MySQL database in order to add the user.
export class AddUserMySQLRepository implements AddUserRepository {
    async add(userData: UserDTO): Promise<User> {
        const { userName, email, password } = userData;
        const user: User = {
            uuid: uuidV4(),
            userName,
            email,
            password: hashSync(password, 10),
            coins: 1000,
            createdAt: new Date(),
            updatedAt: new Date(),
            cardsUsers: []
        };
        const userRepository = MySQLHelper.getEntityRepository(User) as Repository<User>;

        return await userRepository.save(user);
    }

}