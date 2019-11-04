import React, { useState } from 'react';
import { Box, makeStyles, Container, Typography } from '@material-ui/core';
import { user01_mockData, replies_mockData } from '../storage/mockData';
import { SinglePost, UserInfo, SinglePostData } from 'anka-types';
import SinglePostItem from './SingleAnkaPost';
import PostTextAreaContainer from '../containers/PostTextAreaContainer';
import { PostWithLink } from '../containers/PostLinkWrapper';
import { getParseMessagesFromQuery } from '../fn';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POSTS } from '../constants/API';
import getLoadingAndError from './LoadingAndError';

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
  // const postsData = replies_mockData;
  const { loading, error, data } = useQuery(QUERY_POSTS);
  if(data) {
    const postsData = data.ankaposts as SinglePostData[];
    const parsedPosts = postsData
      .map(data => getParseMessagesFromQuery(data));
    return (
      <AnkaPostsPage {...props} queriedParsedPosts={parsedPosts} />
    );
  } else {
    return getLoadingAndError(loading, error);
  }
};

export default AnkaPostsPage;