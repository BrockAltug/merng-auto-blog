import { gql } from '@apollo/client';

// ✅ Query to get a user by username (Includes isVerified)
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      isVerified
    }
  }
`;

// ✅ Query to get the logged-in user's data (Includes isVerified)
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      isVerified
    }
  }
`;