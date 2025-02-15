import { gql } from '@apollo/client';

// ✅ Mutation to log in a user (Only verified users can log in)
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ✅ Mutation to register a new user (Returns a success message)
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password)
  }
`;

// ✅ Mutation to verify email (User enters verification code)
export const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!, $verificationCode: String!) {
    verifyEmail(email: $email, verificationCode: $verificationCode) {
      token
      user {
        _id
        username
      }
    }
  }
`;