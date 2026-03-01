import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
    id?: number;
    name: string;
    email: string;
    age: number;
}

@Injectable()
export class UsersService {

    nextId: number = 1;
    users: User[] = [];

    getUsers(): User[] {
        return this.users;
    }

    getUser(id: number): User | string {
        const index = this.users.findIndex(user => user.id == id);
        const user = this.users[index];

        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }
        return user;

    }

    createUser(newUser: User): User {

        newUser.id = this.nextId++;
        this.users.push(newUser);

        return newUser;
    }

    updateUser(id: number, updatedUser: User): User {
        const index = this.users.findIndex(user => user.id == id);

        if (index < 0) {
            throw new NotFoundException("Usuário não encontrado");
        }

        const user = this.users[index];

        if (updatedUser.name) user.name = updatedUser.name;
        if (updatedUser.email) user.email = updatedUser.email;
        if (updatedUser.age) user.age = updatedUser.age;

        this.users[index] = user;

        return user;

    }

    deleteUser(id: number) {
        const user = this.users.find(user => user.id == id);

        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        this.users = this.users.filter(user => user.id != id);

        return {
            message: "Usuário removido com sucesso",
            deletedUser: user
        };
    }
}
