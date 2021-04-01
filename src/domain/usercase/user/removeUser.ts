import { User } from "@domain/entity";
import { IUserGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class RemoveUser {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async removeById(id: number): Promise<User> {
        return this.userGateway.removeById(id);
    }

    async remove(user: User): Promise<User> {
        return this.userGateway.remove(user);
    }
}