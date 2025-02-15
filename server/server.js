require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

// ✅ Debugging Logs for ENV Variables
console.log("🔍 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔍 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Function to Start Apollo Server & Express App
const startApolloServer = async () => {
  try {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`🚀 API server running on port ${PORT}!`);
        console.log(`📡 Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });

    db.on('error', (err) => {
      console.error('❌ Database connection error:', err);
    });

  } catch (error) {
    console.error("❌ Failed to start the server:", error);
  }
};

// ✅ Start the Server
startApolloServer();