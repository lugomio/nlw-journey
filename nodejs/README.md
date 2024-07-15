# Plann.er
![banner](https://github.com/lugomio/nlw-journey/blob/master/banner.png)

## Description

**Plann.er** is an innovative travel planning app that allows users to create trips, add activities, useful links, and invite friends to share in the adventure.

### Objective
The main objective of Plann.er is to provide an effective and easy-to-use tool for organizing and planning trips in a detailed and collaborative manner.

### Why It Was Created
This project was created with the purpose of starting learning in modern technologies such as React, providing a practical environment for the development of these skills.

## Technologies

Plann.er was developed using the following technologies:

- **Node.js**: A server-side JavaScript runtime environment.
- **Fastify**: A web framework for Node.js focused on performance.
- **Prisma**: An ORM (Object-Relational Mapping) for Node.js and TypeScript.
- **Zod**

## Installation Instructions

### Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** (Node.js package manager): Usually installed with Node.js

### Steps

1. Follow the steps in the README of the main nlw-journey folder.
2. Navigate to the backend directory:

   ```bash
   cd nlw-journey/nodejs
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```
   
4. Create your `.env` file based on the `.env.example`

5. Set up the database using Prisma:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

## How to Use

Follow the references available at: [References](https://nlw-journey.apidocumentation.com/reference)