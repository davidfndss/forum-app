import { Controller, Post, Body, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service'
import { Prisma, User as UserModel } from '@prisma/client'

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;
   
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Body() body: Prisma.UserCreateInput
  ): Promise<{ access_token: string }> {
    return this.authService.signin(body)
  }
}
