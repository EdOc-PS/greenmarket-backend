import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./repositories/users.repository";

@Injectable()
export class UsersService {

  constructor(private usersRepository: UsersRepository) {}

  async findByIdOrFail(id: number) {

    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

}