import { gql } from "@apollo/client";

export const GET_APPOINTMENTS = gql`
  query Appointment($id: ID!) {
    appointment(_id: $id) {
      date
      propertyAddress
    }
  }
`;
