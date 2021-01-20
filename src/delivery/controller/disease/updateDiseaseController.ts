import { Controller, HttpRequest, HttpResponse } from "../index";
import { IDiseaseGateway } from "@src/data/gateway";
import { UpdateDisease } from "@src/domain/usercase/disease";
import { okay, noContent } from "@src/helper/http";
import { Disease } from "@domain/entity"
import { HttpRequestToDiseaseFactory } from "@src/main/factory"

export class UpdateDiseaseController implements Controller {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const updateDisease = new UpdateDisease(this.diseaseGateway);

        if (httpRequest.params.id) {
            const disease: Disease = new HttpRequestToDiseaseFactory(httpRequest).make();
            return updateDisease.update(httpRequest.params.id, disease).then(disease => {
                return okay(disease);
            }).catch(error => {
                return noContent();
            });

        } else {
            return noContent();
        }

    }
}