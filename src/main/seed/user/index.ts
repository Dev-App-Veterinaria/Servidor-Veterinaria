import 'module-alias/register';
import config from "@src/main/config";
import mongoose from "mongoose";
import { AddUser } from "@domain/usercase/user/addUser";
import { HttpRequestToUserFactory } from "@src/main/factory"
import { UserGateway } from "@src/infrastructure/db/mongoose";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { User } from "@domain/entity"
import { exit } from "process";
import { userSeed } from "./userSeed";

export * from "./userSeed";

export type UserSeeds = {
    name: string,
    seed: object[]
}

export class UserSeeder {

    private mongoose: any;
    private addUser: AddUser;
    seeds: UserSeeds[] = [];

    constructor(mongoose: any, addUser: AddUser) {
        this.mongoose = mongoose;
        this.addUser = addUser;
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
        console.log("seed", this.seeds[0].seed)
        for (const seed of this.seeds) {
            console.log('\x1b[36m%s\x1b[0m', `Adding ${seed.name}...`);

            const seedSize = seed.seed.length;
            let count = 1;
            try {
                for (const obj of seed.seed) {
                    try {
                        const user: User = new HttpRequestToUserFactory({ body: obj }).make();
                        await this.addUser.add(user);
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

export const userInit = async () => {

    const validations: IValidation[] = [
        new RequiredFieldValidation('name'),
        new RequiredFieldValidation('password'),
        new RequiredFieldValidation('email')
    ];

    const userSeeder = new UserSeeder(mongoose, new AddUser(new UserGateway(), new ValidationComposite(validations)));


    userSeeder.addSeed('UserSeed', userSeed);

    try {
        await userSeeder.populate();
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', err);
    }

}
