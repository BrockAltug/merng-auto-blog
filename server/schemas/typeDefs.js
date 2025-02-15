const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    isVerified: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): String
    verifyEmail(email: String!, verificationCode: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;