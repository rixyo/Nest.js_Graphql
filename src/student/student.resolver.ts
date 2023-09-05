import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateStudentInput } from './student.input';
@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return await this.studentService.createStudent(createStudentInput);
  }
  @Query((returns) => StudentType)
  async student(@Args('id', new ParseUUIDPipe()) id: string) {
    return await this.studentService.getStudent(id);
  }
  @Query((returns) => [StudentType])
  async students() {
    return await this.studentService.findAll();
  }
}
