const express = require('express');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Apply the authMiddleware to the request in the Apollo Server context

});

async function startServer(){
  await apolloServer.start()
  apolloServer.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
}

startServer();
