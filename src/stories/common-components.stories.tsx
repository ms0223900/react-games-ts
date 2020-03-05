import React from 'react';
import { withActions, action } from '@storybook/addon-actions';
import Modal from 'app/common-components/Modal';
import { Typography } from '@material-ui/core';
import MultiUserPage from 'app/common-components/MultiUserPage';
import BasicFormContainer from 'components/BasicFormWithSend/BasicFormContainer';
import { inputNameValue } from './__mocks/common-mocks';

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