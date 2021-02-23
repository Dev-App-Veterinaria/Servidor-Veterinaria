import { Controller, HttpRequest, HttpResponse } from "../index";
import { IArticleGateway } from "@src/data/gateway";
import { UpdateArticle } from "@domain/usercase/article";
import { okay, noContent } from "@src/helper/http";
import { Article } from "@domain/entity"
import { HttpRequestToArticleFactory } from "@src/main/factory"

export class UpdateArticleController implements Controller {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const updateArticle = new UpdateArticle(this.articleGateway);

        if (httpRequest.params.id) {
            const article: Article = new HttpRequestToArticleFactory(httpRequest).make();
            return updateArticle.update(httpRequest.params.id, article).then(article => {
                return okay(article);
            }).catch(error => {
                return noContent();
            });

        } else {
            return noContent();
        }

    }
}