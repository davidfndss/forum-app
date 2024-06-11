import { Controller, Body, Post, Get, Delete, Patch, Inject, Param, UseGuards, ParseIntPipe, UsePipes, ExecutionContext, Request } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client'
import { UserService } from './user.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';

@Controller('user')
export class UserController {
  @Inject()
  private readonly UserService: UserService;

  @UsePipes(new ZodValidationPipe(CreateUserDto))
  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput
  ):Promise<UserModel> {
    return this.UserService.createUser(userData)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number
  ):Promise<Omit<UserModel, 'password'>> {
    return this.UserService.user({ id })
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(UpdateUserDto))
  @Patch(':id')
    async updateUser(
      @Body() userData: Prisma.UserUpdateInput,
      @Request() req
    ):Promise<Omit<UserModel, 'password'>> {
      const id = req.params.id

      return this.UserService.updateUser({ 
        where: { 
          id: Number(id) 
        }, 
        data: userData 
      })
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
    async deleteUser(
      @Param('id', ParseIntPipe) id: number
    ):Promise<UserModel> {
      return this.UserService.deleteUser({ id })
  }
}