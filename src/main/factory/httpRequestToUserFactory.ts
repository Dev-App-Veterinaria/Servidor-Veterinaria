import { User } from "@domain/entity";
import { HttpRequest } from "@src/delivery/controller/http"
export class HttpRequestToUserFactory {
    private _httpRequest: HttpRequest;

    constructor(httpRequest: HttpRequest) {
        this._httpRequest = httpRequest;
    }

    make(): User {
        const body = this._httpRequest.body;
        const User: User = {
            name: body.name,
            email: body.email,
            password: body.password
        }
        return User;
    }
}