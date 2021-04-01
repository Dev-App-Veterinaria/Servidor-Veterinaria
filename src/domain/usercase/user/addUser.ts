import { User } from "@domain/entity";
import { IUserGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class AddUser {

    userGateway: IUserGateway;
    userValidation: IValidation

    constructor(userGateway: IUserGateway, userValidation: IValidation) {
        this.userGateway = userGateway;
        this.userValidation = userValidation;
    }

    async add(user: User): Promise<User> {
        const error = this.userValidation.validate(user);
        if(error){
            throw error;
        }
        return this.userGateway.add(user);
    }
}