import { IArticleGateway } from "@src/data/gateway/articleGateway";
import { articleModel, IArticleModel } from "@src/main/model";
import { Model } from "mongoose";
import { Article } from "@domain/entity";

export class ArticleGateway implements IArticleGateway {

    private _model: Model<IArticleModel>;

    constructor() {
        this._model = articleModel;
    }

    getAll(query: any = {}): Promise<Article[]> {
        const { tags, ...rest } = query;
        const options = tags ? { tags: { $in: tags.split(",") }, ...rest } : rest;
        return this._model.find(options).then(docs => {
            const articles: Article[] = docs;
            return articles;
        });
    }

    getById(id: number): Promise<Article> {
        return this._model.findById(id).then(doc => {
            const article: Article = doc;
            return article;
        });
    }

    getByText(text: string, query: object): Promise<Article[]> {
        return this._model.find({ ...query, $text: { $search: text } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .limit(20)
            .then(docs => {
                const articles: Article[] = docs;
                return articles;
            });
    }

    add(article: Article): Promise<Article> {
        return this._model.create(article).then(doc => {
            const article: Article = doc;
            return article;
        });
    }

    update(id: number, article: Article): Promise<Article> {
        return this._model.findByIdAndUpdate(id, article).then(doc => {
            const article: Article = doc;
            return article;
        });

    }

    removeById(id: number): Promise<Article> {
        return this._model.findByIdAndRemove(id).then(doc => {
            const article: Article = doc;
            return article;
        });
    }

    remove(article: Article): Promise<Article> {
        return this._model.findOneAndRemove(article).then(doc => {
            const article: Article = doc;
            return article;
        });
    }
}