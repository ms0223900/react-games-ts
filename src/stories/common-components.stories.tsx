import React from 'react';
import MealItem from 'app/common-components/mealItem';
import { meal_mockData } from 'app/common-components/storage/mockData';
import Modal from 'app/common-components/Modal';
import { Typography } from '@material-ui/core';
import GrouponResultContent from 'app/groupon-form/GrouponResultContent';
import { createList_mockData } from 'storage/create-form-mocks';

export default {
  title: 'common components'
};

export const mealItem = () => (
  <MealItem {...meal_mockData} />
);

export const modal = () => (
  <Modal isModal={true}>
    <Typography>{'hi'}</Typography>
  </Modal>
);

export const modalWithContent = () => (
  <Modal isModal={true}>
    <GrouponResultContent {...createList_mockData} username={'aaa122'} />
  </Modal>
);