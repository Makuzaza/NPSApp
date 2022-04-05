import { gql } from "@apollo/client";
export const GET_SUBMISSIONS = gql`
  query {
    getAllSubmissions {
      _id
      score
      feedback
      created_at
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation createSubmission($score: Int!, $feedback: String!) {
    createSubmission(score: $score, feedback: $feedback) {
      _id
      score
      feedback
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      access_token
      success
    }
  }
`;
