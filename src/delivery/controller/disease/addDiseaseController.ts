import { Controller, HttpRequest, HttpResponse } from "../index";
import { IDiseaseGateway } from "@src/data/gateway";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { AddDisease } from "@src/domain/usercase/disease";
import { Disease } from "@domain/entity"
import { HttpRequestToDiseaseFactory } from "@src/main/factory"
import { badRequest, okay } from "@src/helper/http";

export class AddDiseaseController implements Controller {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const disease: Disease = new HttpRequestToDiseaseFactory(httpRequest).make();

        const validations: IValidation[] = [
            new RequiredFieldValidation('name'),
            new RequiredFieldValidation('etiologicalAgent'),
            new RequiredFieldValidation('vector'),
            new RequiredFieldValidation('lifeCycle'),
            new RequiredFieldValidation('transmission'),
            new RequiredFieldValidation('clinicalManifestation'),
            new RequiredFieldValidation('complications'),
            new RequiredFieldValidation('distribution'),
        ];

        const addDisease = new AddDisease(this.diseaseGateway, new ValidationComposite(validations));

        return addDisease.add(disease).then(result => {
            return okay(disease);
        }).catch(error => {
            return badRequest(error);
        });


    }
}