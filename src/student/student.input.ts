import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
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
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @MinLength(6)
  password: string;
}
@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
