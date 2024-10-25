import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEdgeInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  node1_alias: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  node2_alias: string;
}
