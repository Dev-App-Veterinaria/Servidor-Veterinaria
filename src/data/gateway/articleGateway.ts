import { Article } from "@src/domain/entity/Article"

export interface IArticleGateway {
    getAll(query: any): Promise<Article[]>;
    getById(id: number): Promise<Article>;
    getByText(text: string, query: object): Promise<Article[]>;
    add(article: Article): Promise<Article>;
    update(id: number, article: Article): Promise<Article>;
    removeById(id: number): Promise<Article>;
    remove(article: Article): Promise<Article>;
}