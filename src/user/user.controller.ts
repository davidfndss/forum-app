import { Controller, Body, Post, Get, Delete, Patch, Inject, Param, UseGuards } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client'
import { UserService } from './user.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UserController {
  @Inject()
  private readonly UserService: UserService;
  
  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput
  ):Promise<UserModel> {
    return this.UserService.createUser(userData)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id') id: string 
  ):Promise<UserModel> {
    return this.UserService.user({ id: Number(id) })
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
    async updateUser(
      @Body() userData: Prisma.UserUpdateInput,
      @Param('id') id: string 
    ):Promise<UserModel> {
      return this.UserService.updateUser({ where: { id: Number(id)}, data: userData })
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
    async deleteUser(
      @Param('id') id: string
    ):Promise<UserModel> {
      return this.UserService.deleteUser({ id: Number(id) })
  }
}
