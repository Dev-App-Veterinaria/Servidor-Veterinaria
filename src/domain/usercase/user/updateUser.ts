import { User } from "@domain/entity";
import { IUserGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class UpdateUser {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async update(id: number, user: User): Promise<User> {
        return this.userGateway.update(id, user);
    }
}