import { Controller, HttpRequest, HttpResponse } from "../index";
import { IDiseaseGateway } from "@src/data/gateway";
import { GetDiseaseByText } from "@src/domain/usercase/disease";
import { okay, noContent, badRequest } from "@src/helper/http";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";

export class getDiseaseByTextController implements Controller {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        const validations: IValidation[] = [
            new RequiredFieldValidation('text'),
        ];
        const getDisease = new GetDiseaseByText(this.diseaseGateway, new ValidationComposite(validations));

        const { text, ...query } = httpRequest.query;

        return getDisease.getByDistance(text ?? null, query ?? {}).then(diseases => {
            return okay(diseases);
        }).catch(error => {
            return badRequest(error);
        });

    }
}