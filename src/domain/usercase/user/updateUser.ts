import { User } from "@domain/entity";
import { IUserGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"
import * as bcrypt from "bcrypt";


export class UpdateUser {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async update(id: number, user: User): Promise<User> {
        let hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return this.userGateway.update(id, user);
    }
}