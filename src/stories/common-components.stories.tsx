import React from 'react';
import { withActions, action } from '@storybook/addon-actions';
import Modal from 'app/common-components/Modal';
import { Typography } from '@material-ui/core';
import MultiUserPage from 'app/common-components/MultiUserPage';
import BasicFormContainer from 'components/BasicFormWithSend/BasicFormContainer';
import { inputNameValue, userProps } from './__mocks/common-mocks';
import NavBar from 'components/BasicUserWrapper/NavBar';
import User from 'components/BasicUserWrapper/User';
import LogInSignIn from 'components/BasicUserWrapper/LogInSignIn';
import BasicUserWrapper from 'components/BasicUserWrapper/BasicUserWrapper';
import { ContextWrapper } from 'components/BasicUserWrapper/context';

export default {
  title: 'common components',
  decorators: [
  ]
};

export const modal = () => (
  <Modal isModal={true}>
    <Typography>{'hi'}</Typography>
  </Modal>
);

export const multiUserPage = () => (
  <MultiUserPage />
);

export const basicForm = () => {
  return (
    <BasicFormContainer
      formName={'Custom Form Name'}
      sendButtonTitle={'custom'}
      sendFn={action('sendform')}
      initInputNameValue={inputNameValue} />
  );
};

export const navBar = () => (
  <NavBar>
    <User {...userProps} />
  </NavBar>
);

export const user = () => (
  <>
    <User {...userProps} />
    <hr />
    <User 
      {...userProps}
      name={'自訂使用者名稱'} 
      userImageUrl={'/static/01_1080_1920 (2).png'} />
  </>
);

export const loginSignin = () => (
  <>
    <LogInSignIn {...userProps} />
    <hr />
    <LogInSignIn {...userProps} isLogin={true} />
  </>
);

export const basicUserWrapper = () => (
  <BasicUserWrapper 
    initUser={{
      ...userProps,
      // isLogin: true,
    }}
    loginFn={(cb) => {
      cb && cb({
        ...userProps,
        name: 'adasdasdada',
        isLogin: true
      });
    }}
  >
    <h1>{'Your content here'}</h1>
  </BasicUserWrapper>
);