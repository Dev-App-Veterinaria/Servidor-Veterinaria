import 'module-alias/register';
import config from "@src/main/config";
import mongoose from "mongoose";
import { AddDisease } from "@src/domain/usercase/disease/addDisease";
import { HttpRequestToDiseaseFactory } from "@src/main/factory"
import { DiseaseGateway } from "@src/infrastructure/db/mongoose";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { Disease } from "@domain/entity"
import { exit } from "process";


export type Seeds = {
    name: string,
    seed: object[]
}

export class DiseaseSeeder {

    private mongoose: any;
    private addDisease: AddDisease;
    seeds: Seeds[] = [];

    constructor(mongoose: any, addDisease: AddDisease) {
        this.mongoose = mongoose;
        this.addDisease = addDisease;
        try {
            this.mongoose.connect(config.DATABASE_ADDR, {
                useNewUrlParser: true,
            });
        } catch (error) {
            console.log('erro: '.concat(error));
        }
    }

    addSeed(name: string, seed: object[]) {
        this.seeds.push({
            name,
            seed
        })
    }

    async populate() {
        for (const seed of this.seeds) {
            console.log('\x1b[36m%s\x1b[0m', `Adding ${seed.name}...`);
            const seedSize = seed.seed.length;
            let count = 1;
            try {
                for (const obj of seed.seed) {
                    try {
                        const disease: Disease = new HttpRequestToDiseaseFactory({ body: obj }).make();
                        await this.addDisease.add(disease);
                        console.log(`add ${seed.name} ${count}...${seedSize}`);
                        count += 1;
                    } catch (err) {
                        throw err
                    }

                }
            } catch (err) {
                if (err.name === 'MongoError') {
                    if (err.message.split(" ").includes("E11000")) {
                        console.warn('\x1b[33m%s\x1b[0m', `Database already populated with ${seed.name}!`);
                    }
                } else {
                    throw err;
                }
            }

        };
    }
}

const init = async () => {

    const validations: IValidation[] = [
        new RequiredFieldValidation('diseaseCod'),
        new RequiredFieldValidation('location'),
        new RequiredFieldValidation('entity'),
        new RequiredFieldValidation('country'),
        new RequiredFieldValidation('status'),
        new RequiredFieldValidation('type'),
    ];

    const diseaseSeeder = new DiseaseSeeder(mongoose, new AddDisease(new DiseaseGateway(), new ValidationComposite(validations)));

    try {
        await diseaseSeeder.populate();
        process.exit();
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', err);
        process.exit();
    }

}

init();

