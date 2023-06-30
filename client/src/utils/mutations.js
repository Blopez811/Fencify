import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        username
        email
      }
    }
  }
`;
