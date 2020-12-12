import { gql } from "@apollo/client";
import { client } from "./client";

export const getClassrooms = () => {

  return client.query({
    query: gql`
      query {
        classrooms {
          id
          name
          chair
          special
          isWing
          description
          occupied {
            user {
              firstName
              lastName
              type
            }
            until
          }
          instruments {
            id
            type
            name
            rate
          }
          schedule(date: "2020-12-17T03:24:00") {
            user {
              lastName
            }
            from
            to
            activity
          }
        }
      }
    `,
  });
};

export const getUsers = () => {
  return client.query({
    query: gql`
      query {
        users {
          id
          firstName
          patronymic
          lastName
          type
          department
        }
      }
    `,
  });
};
export const getRegister = (date: string) => {
  return client.query({
    query: gql`
      query {
        register(date: "02.12.2020") {
          id
          user {
            lastName
          }
          classroom {
            name
          }
          start
          end
        }
      }
    `,
  });
};
