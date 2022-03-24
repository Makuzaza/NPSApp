import { gql } from "@apollo/client";
export const GET_SUBMISSIONS = gql`
  query {
    getAllSubmissions {
      _id
      score
      created_at
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation createSubmission($score: Int!) {
    createSubmission(score: $score) {
      _id
      score
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password)
  }
`;
