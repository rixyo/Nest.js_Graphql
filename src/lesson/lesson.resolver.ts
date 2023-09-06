/**
 * this file is responsible for the resolver of the lesson entity.
 * The lesson resolver is the resolver for the lesson entity.
 * The lesson resolver will contain the following methods:
 * 1. lesson: this method will be used to get a lesson by id.
 * 2. createLesson: this method will be used to create a lesson.
 */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateLessonInput } from './lession.input';
import { AssignStudentToLession } from './assign-student-to-lession.input';
import { DeleteLessonType } from './lesson.delete.type';
import { AuthGuard } from 'src/Guard/auth.guard';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from 'src/student/student.entity';
@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}
  @Query((returns) => LessonType)
  @UseGuards(AuthGuard)
  @UserRole(Role.ADMIN, Role.USER)
  async lesson(@Args('id', new ParseUUIDPipe()) id: string) {
    return await this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  @UseGuards(AuthGuard)
  @UserRole(Role.ADMIN)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => [LessonType])
  async lessons(
    @Args('name', { nullable: true }) name: string,
    @Args('search', { nullable: true }) search: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    const filters = {
      ...(name && { name }),
      ...(search && { search }),
    };
    return await this.lessonService.findAll(filters, page);
  }
  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentToLession,
  ) {
    return await this.lessonService.assignStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }
  @Mutation((returns) => DeleteLessonType)
  async removeStudentFromLesson(@Args('id', new ParseUUIDPipe()) id: string) {
    await this.lessonService.removeLesson(id);
    // You can return a success message or any data you need
    return {
      message: 'Lesson removed successfully',
      lessonId: id,
    };
  }
}
