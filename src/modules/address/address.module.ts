import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '@/database/prisma.service';
import { AddressRepository } from './repositories/address.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [UsersModule],
  providers: [
    AddressService,
    AddressRepository,
    PrismaService,
    JwtAuthGuard
  ],
  controllers: [AddressController]
})
export class AddressModule { }
