import { Controller, HttpRequest, HttpResponse } from "../index";
import { IUserGateway } from "@src/data/gateway";
import { GetUser } from "@domain/usercase/user";
import { okay, noContent } from "@src/helper/http";

export class GetUserController implements Controller {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const getUser = new GetUser(this.userGateway);
        if (httpRequest.params.id) {
            return getUser.getById(httpRequest.params.id).then(user => {
                return okay(user);
            }).catch(error => {
                return noContent();
            });

        } else {
            const user = await getUser.getAll(httpRequest.query);
            return okay(user);
        }

    }
}