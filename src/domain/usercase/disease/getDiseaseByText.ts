import { Disease } from "@domain/entity";
import { IDiseaseGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetDiseaseByText {

    diseaseGateway: IDiseaseGateway;
    diseaseValidation: IValidation

    constructor(diseaseGateway: IDiseaseGateway, diseaseValidation: IValidation) {
        this.diseaseGateway = diseaseGateway;
        this.diseaseValidation = diseaseValidation;
    }

    async getByDistance(text: string, query: object): Promise<Disease[]> {
        console.log("param", { text, ...query })
        const error = this.diseaseValidation.validate({ text, ...query });
        if (error) {
            throw error;
        }
        return this.diseaseGateway.getByText(text, query);
    }
}