import gql from 'graphql-tag';

export const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      comments {
        id
        body
        createdAt
        username
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;
