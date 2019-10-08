import React from 'react';
import CreatePart from 'app/groupon-form/create-part';
import CreateGroupoonSelectMeal from 'app/groupon-form/create-groupon-select-meal';
import 'style/style.css';

export default {
  title: 'create part forms'
};

export const createPart = () => (
  <CreatePart />
);

export const createGrouponSelectMeal = () => (
  <CreateGroupoonSelectMeal />
);