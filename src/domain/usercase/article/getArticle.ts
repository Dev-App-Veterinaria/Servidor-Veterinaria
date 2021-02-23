import { Article } from "@domain/entity";
import { IArticleGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetArticle {

    articleGateway: IArticleGateway;

    constructor(articleGateway: IArticleGateway) {
        this.articleGateway = articleGateway;
    }

    async getAll(query: any = {}): Promise<Article[]> {
        return this.articleGateway.getAll(query);
    }

    async getById(id: number): Promise<Article> {
        return this.articleGateway.getById(id);
    }
}