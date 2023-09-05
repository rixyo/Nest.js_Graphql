import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
@InputType()
export class CreateStudentInput {
  @MinLength(2)
  @MaxLength(30)
  @Field()
  firstName: string;
  @MaxLength(30)
  @MinLength(2)
  @Field()
  lastName: string;
}
