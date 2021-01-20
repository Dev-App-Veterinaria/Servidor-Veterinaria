import { Disease } from "@domain/entity";
import { IDiseaseGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class AddDisease {

    diseaseGateway: IDiseaseGateway;
    diseaseValidation: IValidation

    constructor(diseaseGateway: IDiseaseGateway, diseaseValidation: IValidation) {
        this.diseaseGateway = diseaseGateway;
        this.diseaseValidation = diseaseValidation;
    }

    async add(disease: Disease): Promise<Disease> {
        const error = this.diseaseValidation.validate(disease);
        if(error){
            throw error;
        }
        return this.diseaseGateway.add(disease);
    }
}