import { Controller, HttpRequest, HttpResponse } from "../index";
import { IArticleGateway } from "@src/data/gateway";
import { RemoveArticle } from "@domain/usercase/article";
import { badRequest, okay, noContent } from "@src/helper/http";
import { Article } from "@domain/entity"
import { HttpRequestToArticleFactory } from "@src/main/factory"

export class RemoveArticleController implements Controller {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const removeArticle = new RemoveArticle(this.articleGateway);

        if (httpRequest.params.id) {
            return removeArticle.removeById(httpRequest.params.id).then(article => {
                return okay(article);
            }).catch(error => {
                return noContent();
            });

        } else {
            const article: Article = new HttpRequestToArticleFactory(httpRequest).make();
            return removeArticle.remove(article).then(article => {
                return okay(article);
            }).catch(error => {
                return noContent();
            });

        }

    }
}