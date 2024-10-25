import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EdgesService } from './edges.service';
import { Edge } from './entities/edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';

@Resolver(() => Edge)
export class EdgesResolver {
  constructor(
    private readonly edgesService: EdgesService,
  ) {}


  // @Query: get all edges
  @Query(() => [Edge]) // Return type of the getEdges query
  async getEdges() {
    return this.edgesService.getEdges();
  }

  // @Query: get edge by id
  @Query(() => Edge) // Return type of the getEdge query
  async getEdge(@Args('id') id: string) {
    return this.edgesService.getEdge(id);
  }

  // @Mutate: create new edge
  @Mutation(() => Edge)
  async createEdge(@Args('createEdgeInput') createEdgeInput: CreateEdgeInput) {
    return await this.edgesService.createEdge(createEdgeInput);
  }
}
