import { User } from "@src/domain/entity"

export interface IUserGateway {
    getAll(query: any): Promise<User[]>;
    getById(id: number): Promise<User>;
    add(user: User): Promise<User>;
    authenticate(user: User): Promise<User>;
    update(id: number, user: User): Promise<User>;
    removeById(id: number): Promise<User>;
    remove(user: User): Promise<User>;
}