import { Controller, HttpRequest, HttpResponse } from "../index";
import { IDiseaseGateway } from "@src/data/gateway";
import { GetDisease } from "@src/domain/usercase/disease";
import { okay, noContent } from "@src/helper/http";

export class GetDiseaseController implements Controller {

    diseaseGateway: IDiseaseGateway;

    constructor(diseaseGateway: IDiseaseGateway) {
        this.diseaseGateway = diseaseGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const getDisease = new GetDisease(this.diseaseGateway);
        if (httpRequest.params.id) {
            return getDisease.getById(httpRequest.params.id).then(disease => {
                return okay(disease);
            }).catch(error => {
                return noContent();
            });

        } else {
            const disease = await getDisease.getAll(httpRequest.query);
            return okay(disease);
        }

    }
}