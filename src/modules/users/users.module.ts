import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from '@/database/prisma.service';

@Module({
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
