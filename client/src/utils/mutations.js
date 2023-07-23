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

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      email
      username
    }
    token
  }
}
`

