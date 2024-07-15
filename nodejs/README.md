# Plann.er
![banner](https://github.com/lugomio/nlw-journey/blob/master/banner.png)

## Descrição

**Plann.er** é um aplicativo inovador de planejamento de viagens que permite aos usuários criar viagens, adicionar atividades, links úteis e convidar amigos para compartilhar da aventura. 

### Objetivo
O objetivo principal do Plann.er é proporcionar uma ferramenta eficaz e fácil de usar para organizar e planejar viagens de maneira detalhada e colaborativa.

### Por que foi criado
Este projeto foi criado com a finalidade de iniciar o aprendizado em tecnologias modernas como React, proporcionando um ambiente prático para o desenvolvimento dessas habilidades.

## Tecnologias

Plann.er foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Um ambiente de execução JavaScript server-side.
- **Fastify**: Um framework web para Node.js focado em performance.
- **Prisma**: Um ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **Zod**

## Instruções de Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node.js): Normalmente instalado junto com o Node.js

### Etapas

1. Siga as etapas presentes no README da pasta principal nlw-journey.
2. Navegue até o diretório do backend:

   ```bash
   cd nlw-journey/nodejs
   ```

3. Instale as dependencias:

   ```bash
   npm install
   ```
   
4. Crie seu arquivo `.env` com base no `.env.example`

5. Configure o banco de dados usando Prisma:

   ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Como Usar

Siga as referencias presentes em: [Referencias](https://nlw-journey.apidocumentation.com/reference)