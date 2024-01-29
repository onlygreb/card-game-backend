import { DBLoginUser } from "../../data/usecases";
import { FindUserMySQLRepository } from "../../infra/db/mysql/user-repository";
import { UserLoginController } from "../../presentation/controllers/user";

export const makeUserLoginController = (): UserLoginController => {
    const findUserRepository = new FindUserMySQLRepository();
    const loginUser = new DBLoginUser(findUserRepository);
    return new UserLoginController(loginUser);
}