import { Inject, Injectable, 
  InternalServerErrorException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async createUser(data: Prisma.UserCreateInput) {
    const hashPassword = await bcrypt.hash(data.password, 10)
    
    return this.prisma.user.create({data: { ...data, password: hashPassword }});
  }

  async user( 
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Omit< User, 'password' > | null> {
    return this.prisma.user.findUnique({ 
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }  
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  }): Promise<Omit<User, 'password'>> {
    const { where, data } = params

    const extractUser = (user) => {
      const { id, name, email, createdAt, updatedAt } = user;
      return { id, name, email, createdAt, updatedAt };
    };

    // If the user send the password to update, it will hash and return the user without the password parameter
    try {
      let updatedUser;
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password.toString(), 10);
        updatedUser = await this.prisma.user.update({
          data: { ...data, password: hashedPassword },
          where,
        });
      } else {
        updatedUser = await this.prisma.user.update({
          data,
          where,
        });
      }
      return extractUser(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    
  }
  
  async deleteUser( where: Prisma.UserWhereUniqueInput ): Promise<User> {
    return this.prisma.user.delete({
      where
    });
  }
}
