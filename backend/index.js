const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { todo } = require("./data/todo");
const { users } = require("./data/user");

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User{
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!

    }
         type Todo{
            id: ID!
            title: String!
            completed: Boolean
            user: User
         }
         type Query{
            getTodos: [Todo]
            getAllUser:[User]
            getUser(id: ID!): User
         }
        `,
    resolvers: {
      Todo: {
        user: (todo) => users.filter((e) => e.id === todo.id),
      },
      Query: {
        getTodos: () => todo,
        getAllUser: () => users,
        getUser: (parent, { id }) => users.filter((e) => e.id === id),
      },
    },
  });
  app.use(express.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
};

startServer();
