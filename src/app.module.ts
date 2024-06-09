import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt'
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '86400s' }
  }), QuestionsModule, AnswersModule],
  controllers: []
})
export class AppModule {}
