import { Article } from "@domain/entity";
import { IArticleGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetArticleByText {

    articleGateway: IArticleGateway;
    articleValidation: IValidation

    constructor(articleGateway: IArticleGateway, articleValidation: IValidation) {
        this.articleGateway = articleGateway;
        this.articleValidation = articleValidation;
    }

    async getByDistance(text: string, query: object): Promise<Article[]> {
        console.log("param", { text, ...query })
        const error = this.articleValidation.validate({ text, ...query });
        if (error) {
            throw error;
        }
        return this.articleGateway.getByText(text, query);
    }
}