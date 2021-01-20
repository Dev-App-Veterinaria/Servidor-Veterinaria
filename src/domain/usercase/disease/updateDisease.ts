import { Disease } from "@domain/entity";
import { IDiseaseGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class UpdateDisease {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async update(id: number, disease: Disease): Promise<Disease> {
        return this.diseaseGateway.update(id, disease);
    }
}