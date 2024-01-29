import { DBAddUser } from "../../data/usecases";
import { AddUserMySQLRepository, FindUserMySQLRepository } from "../../infra/db/mysql/user-repository";
import { UserCreateController } from "../../presentation/controllers/user";

export const makeUserCreateController = (): UserCreateController => {
    const addUserRepository = new AddUserMySQLRepository();
    const findUserRepository = new FindUserMySQLRepository();
    const dbAddUser = new DBAddUser(addUserRepository, findUserRepository);
    return new UserCreateController(dbAddUser);
};