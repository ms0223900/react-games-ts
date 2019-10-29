import React, { useState } from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';
import { user01_mockData } from '../storage/mockData';
import { SinglePost, UserInfo } from 'anka-types';
import SinglePostItem from './SingleAnkaPost';
import PostTextAreaContainer from '../containers/PostTextAreaContainer';
import { PostWithLink } from '../containers/PostLinkWrapper';

// use

export type AnkaPostsPageProps = {
  userInfo?: UserInfo
  queriedPosts?: SinglePost[]
}
const AnkaPostsPage = (props: AnkaPostsPageProps) => {
  const {
    userInfo=user01_mockData,
    queriedPosts=[] 
  } = props;
  const [posts, setPosts] = useState(queriedPosts);
  return (
    <Container>
      <Container>
        <Box>
          {posts.map((post, i) => (
            <PostWithLink key={i} {...post}/>
          ))}
        </Box>
        <PostTextAreaContainer
          userInfo={userInfo} 
          posts={posts}
          setPostsFn={setPosts}  />
      </Container>
    </Container>
  );
};

export default AnkaPostsPage;