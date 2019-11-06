/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
  let postsData: SinglePostData[] = replies_mockData;
  const { loading, error, data, fetchMore } = useQuery(QUERY_POSTS, {
    fetchPolicy: 'cache-and-network'
  });
  // useEffect(() => {
  //   fetchMore({
  //     updateQuery: (prev: any, { fetchMoreResult }) => {
  //       if(!prev) return prev;
  //       return {
  //         ...prev,
  //         ankaposts: [
  //           ...prev.ankaposts,
  //           ...fetchMoreResult.ankaposts
  //         ]
  //       };
  //     }
  //   });
  // }, []);
  if(loading) {
    return (
      <Typography>{'loading...'}</Typography>
    );
  }
  if(data) {
    postsData = data.ankaposts as SinglePostData[];
  }
  const parsedPosts = postsData
    .map(data => getParseMessagesFromQuery(data));
  return (
    <>
      {error && (
        <Typography>{'Network had something wrong, it is offline mode.'}</Typography>
      )}
      <AnkaPostsPage 
        {...props} 
        queriedParsedPosts={parsedPosts} />
    </>
  );
};

export default AnkaPostsPage;