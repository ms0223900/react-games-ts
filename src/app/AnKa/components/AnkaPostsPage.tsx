import React, { useState } from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';
import { user01_mockData, replies_mockData } from '../storage/mockData';
import { SinglePost, UserInfo } from 'anka-types';
import SinglePostItem from './SingleAnkaPost';
import PostTextAreaContainer from '../containers/PostTextAreaContainer';
import { PostWithLink } from '../containers/PostLinkWrapper';
import { getParseMessagesFromQuery } from '../fn';

// use

export type AnkaPostsPageProps = {
  userInfo?: UserInfo
  queriedParsedPosts?: SinglePost[]
}
const AnkaPostsPage = (props: AnkaPostsPageProps) => {
  const {
    userInfo=user01_mockData,
    queriedParsedPosts=[] 
  } = props;
  const [posts, setPosts] = useState(queriedParsedPosts);
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

export const AnkaPostWithQuery = (props: AnkaPostsPageProps) => {
  const postsData = replies_mockData;
  const parsedPosts = postsData.map(data => getParseMessagesFromQuery(data));
  return (
    <AnkaPostsPage {...props} queriedParsedPosts={parsedPosts} />
  );
};

export default AnkaPostsPage;