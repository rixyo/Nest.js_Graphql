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
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateLessonInput } from './lession.input';
import { filtersArgs } from './lesson.filter';
@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}
  @Query((returns) => LessonType)
  async lesson(@Args('id', new ParseUUIDPipe()) id: string) {
    return await this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
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
}
