import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query Me {
  me {
    _id
    appointments {
      date
      time
      propertyAddress
      phoneNumber
      email
      customerName
      _id
    }
  }
}
`
;
