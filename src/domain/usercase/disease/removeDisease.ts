import { Disease } from "@domain/entity";
import { IDiseaseGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class RemoveDisease {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async removeById(id: number): Promise<Disease> {
        return this.diseaseGateway.removeById(id);
    }

    async remove(disease: Disease): Promise<Disease> {
        return this.diseaseGateway.remove(disease);
    }
}