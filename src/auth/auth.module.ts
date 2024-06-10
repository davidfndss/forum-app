import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [forwardRef(() => UserModule), JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '86400s' }
  }), DatabaseModule],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard]
})
export class AuthModule {}
