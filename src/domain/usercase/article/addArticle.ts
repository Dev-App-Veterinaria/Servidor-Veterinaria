import { Article } from "@domain/entity";
import { IArticleGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class AddArticle {

    articleGateway: IArticleGateway;
    articleValidation: IValidation

    constructor(articleGateway: IArticleGateway, articleValidation: IValidation) {
        this.articleGateway = articleGateway;
        this.articleValidation = articleValidation;
    }

    async add(article: Article): Promise<Article> {
        const error = this.articleValidation.validate(article);
        if(error){
            throw error;
        }
        return this.articleGateway.add(article);
    }
}