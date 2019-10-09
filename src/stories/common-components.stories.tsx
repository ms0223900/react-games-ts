import React from 'react';
import MealItem from 'app/common-components/mealItem';
import { meal_mockData } from 'app/common-components/storage/mockData';

export default {
  title: 'common components'
};

export const mealItem = () => (
  <MealItem {...meal_mockData} />
);