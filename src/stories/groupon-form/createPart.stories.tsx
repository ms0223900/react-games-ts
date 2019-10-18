import React from 'react';
import CreatePart from 'app/groupon-form/create-part';
import CreateGroupoonSelectMeal from 'app/groupon-form/create-groupon-select-meal';
import CreateGrouponCreateList from 'app/groupon-form/create-groupon-create-list';
import { createList_mockData } from 'storage/create-form-mocks';
import GrouponForm from 'app/containers/grouponForm';

export default {
  title: 'create part forms'
};

export const createPart = () => (
  <CreatePart selectedTag={'aa'} selectTagFn={() => {}} />
);

export const createGrouponSelectMeal = () => (
  <CreateGroupoonSelectMeal />
);

export const createGrouponCreateList = () => (
  <CreateGrouponCreateList {...createList_mockData} />
);

export const grouponForm = () => (
  <GrouponForm />
);