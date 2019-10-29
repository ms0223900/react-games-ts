import React, { ReactNode, ReactElement, Component, ComponentType } from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ID, HOC } from 'common-types';
import { SinglePost } from 'anka-types';
import SinglePostItem from '../components/SingleAnkaPost';

const getPostlink = (postId: ID) => `posts/${postId}`;

type Props = {
  id: ID
}
const LinkHOC: HOC<Props> = (Component) => (props) => {
  const {
    id,
  } = props;
  return (
    <Link to={getPostlink(id)}>
      <Component {...props}/>
    </Link>
  );
};

export const PostWithLink = LinkHOC(SinglePostItem);

export default LinkHOC;