import { IUserGateway } from "@src/data/gateway/userGateway";
import { userModel, IUserModel } from "@src/main/model";
import { Model } from "mongoose";
import { User } from "@domain/entity";
import * as bcrypt from "bcrypt";

export class UserGateway implements IUserGateway {

    private _model: Model<IUserModel>;
 
    constructor() {
        this._model = userModel;
    }

    getAll(query: any = {}): Promise<User[]> {
        const { tags, ...rest } = query;
        const options = tags ? { tags: { $in: tags.split(",") }, ...rest } : rest;
        return this._model.find(options).then(docs => {
            const users: User[] = docs;
            return users;
        });
    }

    getById(id: number): Promise<User> {
        return this._model.findById(id).then(doc => {
            const user: User = doc;
            return user;
        });
    }

    add(user: User): Promise<User> {
        return this._model.create(user).then(doc => {
            const user: User = doc;
            return user;
        });
    }

    update(id: number, user: User): Promise<User> {
        return this._model.findByIdAndUpdate(id, user).then(doc => {
            const user: User = doc;
            return user;
        });

    }

    authenticate(user: User): Promise<User> {
        const email = user.email;
        return this._model.findOne({email}).select('+password').then(async doc => {
            const searchedUser: User = doc;
            if(!searchedUser){
                throw new Error('User not found');
            }
            if(!await bcrypt.compare(user.password, searchedUser.password)){
                throw new Error('Authentication Error')
            }

            return user;
        });
    }

    removeById(id: number): Promise<User> {
        return this._model.findByIdAndRemove(id).then(doc => {
            const user: User = doc;
            return user;
        });
    }

    remove(user: User): Promise<User> {
        return this._model.findOneAndRemove(user).then(doc => {
            const user: User = doc;
            return user;
        });
    }
}