import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from './entities/edge.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Injectable()
export class EdgesService {
  private readonly logger = new Logger(EdgesService.name);
  constructor(
    @InjectRepository(Edge)
    private edgeRepository: Repository<Edge>,
    @Inject('RMQ_SERVICE') private readonly rabbitMQService: ClientProxy
  ) {
    this.logger.log('EdgesService initialized');
  }

  /**
   * Retrieves all edges from the database.
   * @returns A promise that resolves to an array of Edge entities.
   */
  async getEdges(): Promise<Edge[]> {
    return await this.edgeRepository.find();
  }


  /**
   * Retrieves a single edge by its ID.
   * @param id - The unique identifier of the edge to retrieve.
   * @returns A promise that resolves to the retrieved edge.
   * @throws NotFoundException - If no edge is found with the given ID.
   */
  async getEdge(id: string): Promise<Edge> {
    const edge = await this.edgeRepository.findOne({ where: { id } });
    if (!edge) {
      throw new NotFoundException(`Edge with ID ${id} not found`);
    }
    return edge;
  }


  /**
   * Creates a new edge in the database and publishes an event to RabbitMQ.
   * @param createEdgeInput - The input data for creating a new edge.
   * @returns A promise that resolves to the newly created edge.
  */
  async createEdge(createEdgeInput: CreateEdgeInput): Promise<Edge> {
    const { node1_alias, node2_alias } = createEdgeInput;
    const capacity = Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000;
    const edge = this.edgeRepository.create({ node1_alias, node2_alias, capacity });
    const newEdge = await this.edgeRepository.save(edge);

    // Publish event to RabbitMQ after edge creation
    this.rabbitMQService.emit('edge.created', newEdge);

    return newEdge;
  }


  /**
   * Updates an existing edge in the database.
   * @param updateEdgeInput - An object containing the ID and optional new values for the edge's properties.
   * @returns A Promise that resolves to the updated edge.
   * @throws NotFoundException - If no edge with the given ID is found in the database.
  */
  async updateEdge(updateEdgeInput: UpdateEdgeInput): Promise<Edge> {
    const { id, node1_alias, node2_alias } = updateEdgeInput;
    const edge = await this.edgeRepository.findOne({ where: { id } });
    if (!edge) {
      throw new NotFoundException(`Edge with ID ${id} not found`);
    }

    // Update properties
    if (node1_alias) edge.node1_alias = node1_alias;
    if (node2_alias) edge.node2_alias = node2_alias;

    await this.edgeRepository.save(edge);
    return edge;
  }
}
