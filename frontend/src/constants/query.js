import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($search: String, $sortBy: String, $sortOrder: String) {
    users(search: $search, sortBy: $sortBy, sortOrder: $sortOrder) {
      id
      name
      username
      email
      address {
        street
        suite
        city
        zipcode
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;
