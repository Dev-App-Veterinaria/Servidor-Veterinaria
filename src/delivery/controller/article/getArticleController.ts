import { Controller, HttpRequest, HttpResponse } from "../index";
import { IArticleGateway } from "@src/data/gateway";
import { GetArticle } from "@domain/usercase/article";
import { okay, noContent } from "@src/helper/http";

export class GetArticleController implements Controller {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const getArticle = new GetArticle(this.articleGateway);
        if (httpRequest.params.id) {
            return getArticle.getById(httpRequest.params.id).then(article => {
                return okay(article);
            }).catch(error => {
                return noContent();
            });

        } else {
            const article = await getArticle.getAll(httpRequest.query);
            return okay(article);
        }

    }
}