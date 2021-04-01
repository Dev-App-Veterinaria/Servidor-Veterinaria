import { Controller, HttpRequest, HttpResponse } from "../index";
import { IUserGateway } from "@src/data/gateway";
import { IValidation, RequiredFieldValidation, ValidationComposite } from "@src/helper/validations";
import { AuthUser } from "@domain/usercase/user";
import { User } from "@domain/entity"
import { HttpRequestToUserFactory } from "@src/main/factory"
import { badRequest, okay } from "@src/helper/http";


export class AuthenticateUserController implements Controller {

    userGateway: IUserGateway;

    constructor(userGateway: IUserGateway) {
        this.userGateway = userGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const user: User = new HttpRequestToUserFactory(httpRequest).make();

        const validations: IValidation[] = [
            new RequiredFieldValidation('email'),
            new RequiredFieldValidation('password')
        ];

        const authUser = new AuthUser(this.userGateway);

        return authUser.auth(user).then(result => {
            const token = "Test token";
            // const token = jwt.sign({ id: user._id }, "Padrao de teste", { expiresIn: 86400 });
            return okay({ user, token });
        }).catch(error => {
            return badRequest(error);
        });


    }
}


    // async hashPassword(user: User){
    //     const hash = await bcrypt.hash(user.password, 15);
    //     user.password = hash;
    //     console.log(`in method: ${user.password}`);
    // }