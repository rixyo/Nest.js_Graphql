/**
 * This file defines the GraphQL type for the Lesson entity.
 * The GraphQL type for the Lesson entity is the LessonType.
 * The LessonType will contain the following fields:
 * 1. _id: the id of the lesson.
 * 2. name: the name of the lesson.
 * 3. description: the description of the lesson.
 * 4. startDate: the start date of the lesson.
 * 5. endDate: the end date of the lesson.
 */
import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType('Lesson')
export class LessonType {
  @Field((type) => ID)
  _id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
