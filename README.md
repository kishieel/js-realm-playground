# JS Realm Playground

Welcome to the JS Realm Playground, where I showcase my personal JavaScript projects and experiments. This repository
serves as a portfolio of my coding adventures and a space to explore various JavaScript-related technologies.

### About

The JS Realm Playground is my creative hub for experimenting with JavaScript, both on the backend and frontend. Here,
you'll find a collection of my projects that demonstrate my skills and interests in the world of web development.

### Featured Projects

#### [NestJS Apollo Federation](./nestjs-apollo-federation)
This application harnesses Apollo Federation to create subgraphs within microservices and assembles them into a supergraph within a gateway. Additionally, it incorporates a complexity plugin to manage the complexities of the interconnected data, showcasing a powerful approach to microservices architecture and GraphQL.

#### [NestJS With Automock](./nestjs-automock)

A NestJS application showcasing the use of the Automock package in tests to simplify and streamline the testing process.

#### [NestJS CQRS Multiplayer Snake](./nestjs-cqrs)

An application showcasing the CQRS (Command Query Responsibility Segregation) architecture, featuring a multiplayer
snake game powered by WebSockets for real-time interactions.

#### [NestJS Multi-regional Architecture](./nestjs-distributed)
This project showcases a comprehensive microservices architecture in NestJS. It features communication between microservices via RabbitMQ, an event bus dispatching events to specific queues, individual queues for each service, RPC over Rabbit, and a gateway serving as the sole entry point for external access. Additionally, the gateway compiles Swagger API documentation from all microservices into a unified address. With Docker Compose and distinct networks, it simulates a multi-regional environment with independent clusters capable of communication via RabbitMQ with federation plugin.

#### [NestJS Docker](./nestjs-docker)
In this project, Docker is employed to optimize the development and production environments with separate stages. A Dockerfile is used for building both production and development images, while a Docker Compose file prepares the development environment, illustrating an efficient Docker-based setup for NestJS applications.

#### [NestJS Dynamic Guard](./nestjs-dynamic-guard)

A dynamic authentication guard for NestJS that can be instantiated per module with different configurations. This guard
validates incoming requests by checking the authorization token and can be customized for various modules and their
specific authentication secrets.

#### [NestJS Behind Nginx Proxy](./nestjs-nginx)

A containerized NestJS application, along with a containerized Nginx proxy, demonstrating secure SSL communication with
a mocked SSL certificate.

#### [NestJS Prisma Events With RxJS](./nestjs-prisma-rxjs)

This project leverages RxJS to efficiently handle events within a Prisma-powered application. The extended PrismaClient
emits events using an observable Subject, while the designated observers subscribes to these events to trigger
corresponding actions.

#### [NestJS RabbitMQ Event-Driven Microservices](./nestjs-rabbitmq)
In this project, a RabbitMQ-based event-driven architecture is employed to facilitate event distribution among microservices. A specialized microservice is responsible for building and automating the RabbitMQ topology, including the creation of queues, exchanges, and bindings, to streamline the event-driven communication process.

#### [NestJS Caching With Redis](./nestjs-redis)
This application employs Redis for efficient caching operations and introduces a custom decorator to simplify caching in NestJS. 

#### [NestJS Schematics](./nestjs-schematics)
This project introduces custom schematics to expedite the setup of new NestJS projects. By creating a personalized schematic, it streamlines the process of creating boilerplate code, enhancing productivity and project consistency.

#### [NestJS Real-Time Chat With Socket.io](./nestjs-socket.io)
This project showcases a real-time chat application built with NestJS and powered by Socket.io. Users can engage in instant messaging, enabling seamless communication with real-time updates and interactive features.

#### [NestJS SSE Stock Price Streaming](./nestjs-sse)
This project leverages Server-Sent Events (SSE) functionality to stream real-time stock prices. It also implements the strategy design pattern to fetch prices from various sources, offering a flexible and efficient way to monitor and display stock market data.

#### [NestJS With TypeORM](./nestjs-typeorm)
This project serves as a simple showcase of NestJS integrated with TypeORM, featuring the implementation of fundamental concepts such as timestamp columns, one-to-many and many-to-many relations, and database migrations for seamless data management.

### Get Started

To get started with any of the projects in the JS Realm Playground, follow these general steps:

1. **Clone the Repository:**

    ```shell
    git clone https://github.com/kishieel/js-realm-playground.git
    cd js-realm-playground
    ```

2. **Navigate to the Project of Interest:**

   Each project is located in its own directory within this repository. To explore a specific project, navigate to its
   directory using the cd command:

   ```shell
    cd project-name
   ```

   Replace project-name with the actual name of the project you want to explore.

3. **Install dependencies:**

   You can use either yarn or npm to install project dependencies. Run one of the following commands:

    ```shell
    # Using yarn
    yarn install

    # Using npm
    npm install
   ```

4. **Mock SSL certificate (optional):**

   If the project uses Nginx as proxy and requires a mock SSL certificate, you can generate it using the following
   command:

    ```shell
    # Using yarn
    yarn cert
    
    # Using npm
    npm run cert
    ```

5. **Start the project:**

   Most projects can be started with a simple start command. Use one of the following commands to start the project:

    ```shell
    # Using yarn
    yarn start
    
    # Using npm
    npm start
    ```

6. **Access the Project:**

   Once the project is running, you can access it in your web browser by navigating to the `https://app.localhost`. The
   project's README.md may provide additional details on how to access specific features or functionalities.

##### Caveats

If a project deviates from these general instructions, please refer to the README.md file within the specific project
directory for detailed setup and usage instructions.
