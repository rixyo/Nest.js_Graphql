import { ObjectType, Field } from '@nestjs/graphql';
import { type } from 'os';
@ObjectType('DeleteLessonType')
export class DeleteLessonType {
  @Field((type) => String)
  message: string;
  @Field((type) => String)
  lessonId: string;
}
