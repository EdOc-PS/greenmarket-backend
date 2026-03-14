import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '@/database/prisma.service';
import { AddressRepository } from './repositories/address.repository';

@Module({
  imports: [UsersModule],
  providers: [
    AddressService,
    AddressRepository,
    PrismaService
  ],
  controllers: [AddressController]
})
export class AddressModule { }
