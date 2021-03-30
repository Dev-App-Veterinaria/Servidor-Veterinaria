import { User } from "@domain/entity";
import { IUserGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetUser {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async getAll(query: any = {}): Promise<User[]> {
        return this.userGateway.getAll(query);
    }

    async getById(id: number): Promise<User> {
        return this.userGateway.getById(id);
    }
}