import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'my-secret-key',
    signOptions: { expiresIn: '2h' },
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
