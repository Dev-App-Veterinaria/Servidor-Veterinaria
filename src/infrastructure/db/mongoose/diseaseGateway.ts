import { IDiseaseGateway } from "@src/data/gateway/diseaseGateway";
import { diseaseModel, IDiseaseModel } from "@src/main/model";
import { Model } from "mongoose";
import { Disease } from "@domain/entity";

export class DiseaseGateway implements IDiseaseGateway {

    private _model: Model<IDiseaseModel>;

    constructor() {
        this._model = diseaseModel;
    }

    getAll(query: any = {}): Promise<Disease[]> {
        const { tags, ...rest } = query;
        const options = tags ? { tags: { $in: tags.split(",") }, ...rest } : rest;
        return this._model.find(options).then(docs => {
            const diseases: Disease[] = docs;
            return diseases;
        });
    }

    getById(id: number): Promise<Disease> {
        return this._model.findById(id).then(doc => {
            const disease: Disease = doc;
            return disease;
        });
    }

    getByText(text: string, query: object): Promise<Disease[]> {
        return this._model.find( {$or: [{ name: { $regex: new RegExp(`${text}`) }}, 
            { scientificName: { $regex: new RegExp(`${text}`) }} ] } )
            .limit(20)
            .then(docs => {
                const diseases: Disease[] = docs;
                return diseases;
            });
    }

    add(disease: Disease): Promise<Disease> {
        return this._model.create(disease).then(doc => {
            const disease: Disease = doc;
            return disease;
        });
    }

    update(id: number, disease: Disease): Promise<Disease> {
        return this._model.findByIdAndUpdate(id, disease).then(doc => {
            const disease: Disease = doc;
            return disease;
        });

    }

    removeById(id: number): Promise<Disease> {
        return this._model.findByIdAndRemove(id).then(doc => {
            const disease: Disease = doc;
            return disease;
        });
    }

    remove(disease: Disease): Promise<Disease> {
        return this._model.findOneAndRemove(disease).then(doc => {
            const disease: Disease = doc;
            return disease;
        });
    }
}