import React from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [likePost] = useMutation(LIKEPOST, {
    variables: { postId: id },
    onError(err) {},
  });

  const likeButton = user ? (
    likes.find((like) => like.username === user.username) ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' color='teal' basic>
      <Icon name='heart' />
    </Button>
  );

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKEPOST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      body
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export default LikeButton;
