import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LessonType } from 'src/lesson/lesson.type';
@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  _id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field((type) => [LessonType], { nullable: 'itemsAndList' }) // Define the relationship with StudentType
  lessons: LessonType[];
}
