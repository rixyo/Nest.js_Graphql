// Purpose: GraphQL input type for Lesson entity, which will be used in the createLesson mutation.
import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsDateString } from 'class-validator';
@InputType()
export class CreateLessonInput {
  @MinLength(6)
  @MaxLength(30)
  @Field()
  name: string;
  @MaxLength(255)
  @MinLength(6)
  @Field()
  description: string;
  @IsDateString()
  @Field()
  startDate: string;
  @IsDateString()
  @Field()
  endDate: string;
}
