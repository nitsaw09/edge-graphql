import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType() // This decorator makes the class a GraphQL Object Type
@Entity()
export class Edge {
  @Field() // This marks the field as a GraphQL field
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field() // Created_at as GraphQL field
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Field() // Updated_at as GraphQL field
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Field() // Capacity as GraphQL field
  @Column()
  capacity: number;

  @Field() // Node1_alias as GraphQL field
  @Column()
  node1_alias: string;

  @Field() // Node2_alias as GraphQL field
  @Column()
  node2_alias: string;

  @Field() // Computed field for edge_peers
  get edge_peers(): string {
    return `${this.node1_alias}-${this.node2_alias}`;
  }
}
