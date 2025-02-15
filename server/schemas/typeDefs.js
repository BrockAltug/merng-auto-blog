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

  type Blog {
    id: ID!
    title: String!
    content: String!
    image: String!
    createdAt: String!
    seo_keywords: [String]
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    getAllBlogs: [Blog]  # ✅ Fetch all blog posts
    getBlog(id: ID!): Blog  # ✅ Fetch a single blog post
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): String
    verifyEmail(email: String!, verificationCode: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;