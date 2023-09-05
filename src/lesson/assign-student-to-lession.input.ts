import { Field, InputType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class AssignStudentToLession {
  @IsUUID()
  @Field((type) => String)
  lessonId: string;
  @IsUUID('4', { each: true })
  @Field((type) => [String])
  studentIds: string[];
}
