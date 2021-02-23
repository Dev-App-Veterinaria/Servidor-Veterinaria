import { Article } from "@domain/entity";
import { IArticleGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class UpdateArticle {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async update(id: number, article: Article): Promise<Article> {
        return this.articleGateway.update(id, article);
    }
}