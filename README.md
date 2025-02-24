# Chat App Backend

This is a backend server for a real-time chat application built using **Express.js**, **TypeScript**, **PostgreSQL**, and **WebSocket**. The server handles user authentication, message storage, and real-time communication between users.

## Features

- **User Authentication**: Secure user login and registration using JWT.
- **Real-time Messaging**: WebSocket integration for instant communication.
- **Database Storage**: PostgreSQL for storing users and chat history.
- **REST API**: Endpoints for managing users, messages, and chat rooms.
- **TypeScript**: Ensures type safety and maintainability.

## Tech Stack

- **Express.js** – Backend framework
- **TypeScript** – Strongly typed JavaScript
- **PostgreSQL** – Relational database
- **WebSocket** – Real-time communication
- **Prisma ORM** – Database management

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/iss4gerry/chatapp-backend.git
   cd chatapp-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```
 
3. Set up the environment variables:

   Create a `.env` file and add:

   ```env
   PORT=
   DATABASE_URL=
   JWT_SECRET=
   ```

4. Run database migrations:

   ```sh
   npx prisma migrate dev
   ```

5. Start the server:

   ```sh
   npm run dev
   ```

## Contributing

Feel free to contribute by submitting a pull request or opening an issue!
