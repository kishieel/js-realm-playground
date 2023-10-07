# JS Realm Playground

Welcome to the JS Realm Playground, where I showcase my personal JavaScript projects and experiments. This repository
serves as a portfolio of my coding adventures and a space to explore various JavaScript-related technologies.

### About

The JS Realm Playground is my creative hub for experimenting with JavaScript, both on the backend and frontend. Here,
you'll find a collection of my projects that demonstrate my skills and interests in the world of web development.

### Featured Projects

#### [NestJS With Automock](./nestjs-automock)

A NestJS application showcasing the use of the Automock package in tests to simplify and streamline the testing process.

#### [NestJS CQRS Multiplayer Snake](./nestjs-cqrs)

An application showcasing the CQRS (Command Query Responsibility Segregation) architecture, featuring a multiplayer
snake game powered by WebSockets for real-time interactions.

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

#### [NestJS Real-Time Chat With Socket.io](./nestjs-socket.io)
This project showcases a real-time chat application built with NestJS and powered by Socket.io. Users can engage in instant messaging, enabling seamless communication with real-time updates and interactive features.

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
