import React from 'react';
import Modal from 'app/common-components/Modal';
import { Typography } from '@material-ui/core';
import MultiUserPage from 'app/common-components/MultiUserPage';

export default {
  title: 'common components'
};

export const modal = () => (
  <Modal isModal={true}>
    <Typography>{'hi'}</Typography>
  </Modal>
);

export const multiUserPage = () => (
  <MultiUserPage />
);