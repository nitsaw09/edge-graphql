# Edge GraphQL API

This project is a GraphQL API written in NestJS to manage Edge database entries in PostgreSQL. By utilizing the API, it is possible to make, view and manage edges as well as manage node information along with their capacity. The utility also works together with RabbitMQ to send out a notification when an edge is created.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nitsaw09/edge-graphql.git
   cd edge-graphql
2. Install the dependencies:
   ```bash
   npm install
3. Create a `.env` file in the root directory and copy all the envirnoment variables from `.env.example` file.
4. Create `edge_db` in PostgreSQL.


## Configuration
Ensure that RabbitMQ is running, and that the connection details in the .env file match your database setup.

## Usage
1. Start the application:
    ```bash
    npm run start
    ```
2. Access the GraphQL Playground:
Open your browser and navigate to http://localhost:3000/graphql.

## GraphQL Queries
### 1. Get All Edges
```bash
query {
  getEdges {
    id
    created_at
    updated_at
    capacity
    node1_alias
    node2_alias
    edge_peers
  }
}
```
### 2. Get Edge by ID
```bash
query {
  getEdge(id: "YOUR_EDGE_ID") {
    id
    created_at
    updated_at
    capacity
    node1_alias
    node2_alias
    edge_peers
  }
}
```
### 3. Create Edge
To create a new edge, you can use the following mutation (replace NODE1_ALIAS and NODE2_ALIAS with actual values):
```bash
mutation {
  createEdge(createEdgeInput: { node1_alias: "NODE1_ALIAS", node2_alias: "NODE2_ALIAS" }) {
    id
    created_at
    updated_at
    capacity
    node1_alias
    node2_alias
    edge_peers
  }
}
```