import { Controller, HttpRequest, HttpResponse } from "../index";
import { IUserGateway } from "@src/data/gateway";
import { UpdateUser } from "@domain/usercase/user";
import { okay, noContent } from "@src/helper/http";
import { User } from "@domain/entity"
import { HttpRequestToUserFactory } from "@src/main/factory"

export class UpdateUserController implements Controller {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const updateUser = new UpdateUser(this.userGateway);

        if (httpRequest.params.id) {
            const user: User = new HttpRequestToUserFactory(httpRequest).make();
            return updateUser.update(httpRequest.params.id, user).then(user => {
                return okay(user);
            }).catch(error => {
                return noContent();
            });

        } else {
            return noContent();
        }

    }
}