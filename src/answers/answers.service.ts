import { Injectable, Inject } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService
  
  create(createAnswerDto: CreateAnswerDto, sub: any, questionId: number) {

    return this.prisma.answers.create({ 
      data: {
        body: createAnswerDto.body, 
        user: {
          connect:  { id: sub.userId }
        }, 
        question: {
          connect: { id: questionId }
        }
      }
    })
  }

  findAll() {
    return this.prisma.answers.findMany()
  }

  findOne(id: number) {
    return this.prisma.answers.findUnique({ where: {id} })
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    console.log(id)
    return this.prisma.answers.update({ where: {id}, data: updateAnswerDto })
  }

  remove(id: number) {
    return this.prisma.answers.delete({ where: {id} })
  }
}
