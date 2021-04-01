import { Controller, HttpRequest, HttpResponse } from "../index";
import { IUserGateway } from "@src/data/gateway";
import { RemoveUser } from "@domain/usercase/user";
import { badRequest, okay, noContent } from "@src/helper/http";
import { User } from "@domain/entity"
import { HttpRequestToUserFactory } from "@src/main/factory"

export class RemoveUserController implements Controller {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const removeUser = new RemoveUser(this.userGateway);

        if (httpRequest.params.id) {
            return removeUser.removeById(httpRequest.params.id).then(user => {
                return okay(user);
            }).catch(error => {
                return noContent();
            });

        } else {
            const user: User = new HttpRequestToUserFactory(httpRequest).make();
            return removeUser.remove(user).then(user => {
                return okay(user);
            }).catch(error => {
                return noContent();
            });

        }

    }
}