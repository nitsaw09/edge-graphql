import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { EdgesService } from './edges.service';

@Controller()
export class EdgesController {
  private readonly logger = new Logger(EdgesController.name);
  constructor(private readonly edgesService: EdgesService) {
    this.logger.log('EdgesController initialized');
  }

  // This function handles the edge.created event and updating the edge node alias
  @EventPattern('edge.created')
  async handleEdgeCreatedEvent(@Payload() data) {
    try {
      let { id, node1_alias, node2_alias, capacity } = data;
      this.logger.log(`New channel between ${node1_alias} and ${node2_alias} with a capacity of ${capacity} has been created`);
      
      node1_alias = `${node1_alias}-updated`;
      node2_alias = `${node2_alias}-updated`;
      await this.edgesService.updateEdge({ id, node1_alias, node2_alias });
    } catch (error) {
      this.logger.error("Error in processing edge.created event:", error.message);
    }    
  }
}