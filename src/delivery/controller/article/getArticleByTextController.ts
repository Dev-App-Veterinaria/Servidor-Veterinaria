import { Controller, HttpRequest, HttpResponse } from "../index";
import { IArticleGateway } from "@src/data/gateway";
import { GetArticleByText } from "@domain/usercase/article";
import { okay, noContent, badRequest } from "@src/helper/http";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";

export class getArticleByTextController implements Controller {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        const validations: IValidation[] = [
            new RequiredFieldValidation('text'),
        ];
        const getArticle = new GetArticleByText(this.articleGateway, new ValidationComposite(validations));

        const { text, ...query } = httpRequest.query;

        return getArticle.getByDistance(text ?? null, query ?? {}).then(articles => {
            return okay(articles);
        }).catch(error => {
            return badRequest(error);
        });

    }
}