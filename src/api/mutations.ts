import {gql} from "@apollo/client";

export const OCCUPY_CLASSROOM = gql`
    mutation occupyClassroom($input: OccupyClassroomInput!) {
        occupyClassroom(input: $input) {
            classroom {
                occupied {
                    user {
                        id
                        firstName
                        patronymic
                        lastName
                        type
                        department
                    }
                    until
                }
            }
            userErrors {
                message
                code
            }
        }
    }
`;

export const FREE_CLASSROOM = gql`
    mutation free($input: FreeClassroomInput!){
        freeClassroom(input: $input) {
            classroom {
                name
                occupied {
                    user {
                        id
                    }
                }
            }
            userErrors {
                message
                code
            }
        }
    }
`;
