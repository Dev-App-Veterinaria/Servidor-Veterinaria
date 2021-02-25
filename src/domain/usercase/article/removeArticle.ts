import { Article } from "@domain/entity";
import { IArticleGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class RemoveArticle {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async removeById(id: number): Promise<Article> {
        return this.articleGateway.removeById(id);
    }

    async remove(article: Article): Promise<Article> {
        return this.articleGateway.remove(article);
    }
}