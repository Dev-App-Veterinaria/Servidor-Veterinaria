import { Controller, HttpRequest, HttpResponse } from "../index";
import { IDiseaseGateway } from "@src/data/gateway";
import { RemoveDisease } from "@src/domain/usercase/disease";
import { badRequest, okay, noContent } from "@src/helper/http";
import { Disease } from "@domain/entity"
import { HttpRequestToDiseaseFactory } from "@src/main/factory"

export class RemoveDiseaseController implements Controller {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const removeDisease = new RemoveDisease(this.diseaseGateway);

        if (httpRequest.params.id) {
            return removeDisease.removeById(httpRequest.params.id).then(disease => {
                return okay(disease);
            }).catch(error => {
                return noContent();
            });

        } else {
            const disease: Disease = new HttpRequestToDiseaseFactory(httpRequest).make();
            return removeDisease.remove(disease).then(disease => {
                return okay(disease);
            }).catch(error => {
                return noContent();
            });

        }

    }
}