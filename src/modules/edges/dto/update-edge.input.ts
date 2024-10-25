import { PartialType } from '@nestjs/graphql';
import { CreateEdgeInput } from './create-edge.input';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEdgeInput extends PartialType(CreateEdgeInput) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
