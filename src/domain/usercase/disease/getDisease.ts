import { Disease } from "@domain/entity";
import { IDiseaseGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetDisease {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async getAll(query: any = {}): Promise<Disease[]> {
        return this.diseaseGateway.getAll(query);
    }

    async getById(id: number): Promise<Disease> {
        return this.diseaseGateway.getById(id);
    }
}