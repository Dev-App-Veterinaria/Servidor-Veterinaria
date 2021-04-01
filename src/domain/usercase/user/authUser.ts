import { User } from "@domain/entity";
import { IUserGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class AuthUser {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }
 
    async auth(user: User): Promise<User> {
        return this.userGateway.authenticate(user);
    }
}