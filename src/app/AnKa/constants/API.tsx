import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-components';
import Strapi from 'strapi-sdk-javascript/build/main';
import { UserInfo } from 'anka-types';
import { SignUpForm } from 'app/AnKa/components/log-and-sign/NavBar';
import { LogInForm } from '../components/log-and-sign/LogInItem';

export const baseUri = 'http://localhost:1337';
export const URI = process.env.NODE_ENV === 'development' ? 'http://localhost:1337/graphql' : 'https://intense-brushlands-46000.herokuapp.com/graphql';

const link = createHttpLink({ uri: URI, });
const cache = new InMemoryCache();
export const client = new ApolloClient({
  cache,
  link,
});
export const ApolloWrapper = (props: any) => {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
};
 
export const strapi = new Strapi(baseUri);

export const signUp = (
  signUpForm: SignUpForm
) => {
  const { username, email, password } = signUpForm;
  return strapi
    .register(username, email, password)
    .then(res => {
      return res;
    });
};

export const logIn = (
  logInForm: LogInForm
) => {
  const { username, password } = logInForm;
  return strapi.login(username, password)
    .then(res => res);
};


export const QUERY_POSTS = gql`
  query QUERY_POSTS {
    ankaposts {
      id
      userId
      username
      content
      created_at
    }
  }`;

export const QUERY_MESSAGES = gql`
  query QUERY_MESSAGES($whichPost: JSON, $whichPostInPost: JSON) {
    ankamessages(where: $whichPost) {
      id
      userId
      username
      created_at
      content
      postId
    }
    ankaposts(where: $whichPostInPost) {
      id
      userId
      username
      content
      created_at
    }
  }`;

export const ADD_MESSAGE = gql`
  mutation ADD_MESSAGE($payload: createAnkamessageInput) {
    createAnkamessage(input: $payload) {
      ankamessage {
        id
        userId
        username
        created_at
        content
        postId
      }
    }
  }`;

export const ADD_POST = gql`
  mutation ADD_POST($payload: createAnkapostInput) {
      createAnkapost(input: $payload) {
        ankapost {
          id
          userId
          username
          created_at
          content
        }
      }
    }`;

export const QUERY_SAMENAME_USER = gql`
  query QUERY_SAMENAME_USER($userWhere: JSON) {
    users(where: $userWhere) {
      id
      username
      point
      rank
    }
  }`;