import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@/database/prisma.module';
import { UsersRepository } from './repositories/users.repository';

@Module({
  providers: [
    UsersService,
    UsersRepository,
    PrismaModule,
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
