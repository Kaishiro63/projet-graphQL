import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user{id, username, email}
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: UsersPermissionsLoginInput! ) {
    login(input: $input) {
      jwt
      user{id, username, email}
    }
  }
`;

export const PLACES = gql`
  query places {
    places(sort: ["publishedAt:DESC"]) {
      data {
        id
        attributes {
          title
          address
          latitude
          longitude
        }
      }
    }
  }
`;

export const PLACE = gql`
  query place($id: ID!) {
    place(id: $id) {
      data {
        id
        attributes {
          title
          address
          latitude
          longitude
        }
      }
    }
  }
`;

export const CREATE_PLACE = gql`
  mutation createPlace($newPlace: PlaceInput!) {
    createPlace(data: $newPlace) {
      data{
        id
        attributes {
          title
          address
          latitude
          longitude
        }
      }
    }
  }
`;

export const UPDATE_PLACE = gql`
  mutation updatePlace($id: ID!,  $updatePlace: PlaceInput!) {
    updatePlace(id: $id, data: $updatePlace) {
      data{
        id
        attributes {
          title
          address
          latitude
          longitude
        }
      }
    }
  }
`;

export const DELETE_PLACE = gql`
  mutation DeletePlace($id: ID!) {
    deletePlace(id: $id) {
      data {
        id
      }
    }
  }
`;

export const ME_QUERY = gql`
	query {
		me {
			username
			email
		}
	}
`;