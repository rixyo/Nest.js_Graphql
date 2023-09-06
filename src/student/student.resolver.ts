import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationType, StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput, LoginInput } from './student.input';
import { User, UserType } from 'src/decorators/user.decorator';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from './student.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/auth.guard';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Mutation((returns) => AuthorizationType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return await this.studentService.createStudent(createStudentInput);
  }
  @Mutation((returns) => AuthorizationType)
  async Login(@Args('loginInput') loginInput: LoginInput) {
    return await this.studentService.login(loginInput);
  }
  @Query((returns) => StudentType)
  @UseGuards(AuthGuard)
  @UserRole(Role.USER)
  async student(@User() user: UserType) {
    return await this.studentService.getStudent(user.userId);
  }
  @Query((returns) => [StudentType])
  @UseGuards(AuthGuard)
  @UserRole(Role.ADMIN)
  async students() {
    return await this.studentService.findAll();
  }
}
