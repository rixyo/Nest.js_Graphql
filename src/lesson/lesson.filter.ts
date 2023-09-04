import { ArgsType, Field, InputType } from '@nestjs/graphql';
@InputType()
export class filtersArgs implements Partial<filtersArgs> {
  @Field((type) => String, { nullable: true })
  name: string;
  @Field((type) => String, { nullable: true })
  search: string;
}
