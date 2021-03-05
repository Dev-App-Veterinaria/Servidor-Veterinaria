import { Controller, HttpRequest, HttpResponse } from "../index";
import { IArticleGateway } from "@src/data/gateway";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { AddArticle } from "@domain/usercase/article";
import { Article } from "@domain/entity"
import { HttpRequestToArticleFactory } from "@src/main/factory"
import { badRequest, okay } from "@src/helper/http";

export class AddArticleController implements Controller {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const article: Article = new HttpRequestToArticleFactory(httpRequest).make();

        const validations: IValidation[] = [
            new RequiredFieldValidation('name'),
            new RequiredFieldValidation('citation'),
            new RequiredFieldValidation('state'),
            new RequiredFieldValidation('doi'),
            new RequiredFieldValidation('disease'),
        ];

        const addArticle = new AddArticle(this.articleGateway, new ValidationComposite(validations));

        return addArticle.add(article).then(result => {
            return okay(article);
        }).catch(error => {
            return badRequest(error);
        });


    }
}