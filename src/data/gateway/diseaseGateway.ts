import { Disease } from "@src/domain/entity/Disease"

export interface IDiseaseGateway {
    getAll(query: any): Promise<Disease[]>;
    getById(id: number): Promise<Disease>;
    getByText(text: string, query: object): Promise<Disease[]>;
    add(disease: Disease): Promise<Disease>;
    update(id: number, disease: Disease): Promise<Disease>;
    removeById(id: number): Promise<Disease>;
    remove(disease: Disease): Promise<Disease>;
}