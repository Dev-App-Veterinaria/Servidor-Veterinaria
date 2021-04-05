import { Controller, HttpRequest, HttpResponse } from "../index";
import { IUserGateway } from "@src/data/gateway";
import { IValidation, RequiredFieldValidation, ValidationComposite } from "@src/helper/validations";
import { AddUser } from "@domain/usercase/user";
import { User } from "@domain/entity"
import { HttpRequestToUserFactory } from "@src/main/factory"
import { badRequest, okay } from "@src/helper/http";
import * as bcrypt from "bcrypt";

export class AddUserController implements Controller {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const user: User = new HttpRequestToUserFactory(httpRequest).make();

        const validations: IValidation[] = [
            new RequiredFieldValidation('name'),
            new RequiredFieldValidation('email'),
            new RequiredFieldValidation('password')
        ];

        const addUser = new AddUser(this.userGateway, new ValidationComposite(validations));

        // esse método irá encriptar a senha e salvar o usuário.
        let hashedPassword = await bcrypt.hash(user.password, 15);
        user.password = hashedPassword;
        return addUser.add(user).then(result => {
            user.password = undefined; // faz com que a senha não seja retornada após o cadastro
            return okay(user);
        }).catch(error => {
            return badRequest(error);
        });
    }
}
