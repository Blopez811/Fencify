const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    appointments: [Appointment]!
  }

  type Appointment {
    _id: ID!
    date: String!
    time: String!
    customerName: String!
    phoneNumber: String!
    email: String!
    propertyAddress: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AppointmentInput {
    date: String!
    time: String!
    customerName: String!
    phoneNumber: String!
    email: String!
    propertyAddress: String!
  }

  type Query {
    me: User
    appointments: [Appointment]!
    appointment(_id: ID!): Appointment
    allUsers: [User]
  }

  type Mutation {
    signup(input: SignupInput!): Auth
    login(input: LoginInput!): Auth
    createAppointment(input: AppointmentInput!): Appointment
    updateAppointment(_id: ID! input: AppointmentInput!): Appointment
    deleteAppointment(_id: ID!): Appointment
  }
`;

module.exports = typeDefs;
