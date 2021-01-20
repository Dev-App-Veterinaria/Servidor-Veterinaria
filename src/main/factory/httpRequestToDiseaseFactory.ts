import { Disease } from "@domain/entity";
import { HttpRequest } from "@src/delivery/controller/http"
export class HttpRequestToDiseaseFactory {
    private _httpRequest: HttpRequest;

    constructor(httpRequest: HttpRequest) {
        this._httpRequest = httpRequest;
    }

    make(): Disease {
        const body = this._httpRequest.body;
        const Disease: Disease = {
            name: body.name,
            etiologicalAgent: body.etiologicalAgent,
            vector: body.vector,
            lifeCycle: body.lifeCycle,
            transmission: body.transmission,
            clinicalManifestation: body.clinicalManifestation,
            complications: body.complications,
            distribution: body.distribution
        }
        return Disease;
    }
}