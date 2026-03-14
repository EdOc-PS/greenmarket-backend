import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma.service';

@Module({
  imports: [JwtModule.register({
    secret: 'my-secret-key',
    signOptions: { expiresIn: '2h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule { }
