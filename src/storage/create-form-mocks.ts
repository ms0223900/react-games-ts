import { CreateGrouponCreateListProps } from "app/groupon-form/create-groupon-create-list";
import { meal_mockData } from "app/common-components/storage/mockData";

export const tags_mockData = [
  'aa',
  'bb'
];

export const createList_mockData: CreateGrouponCreateListProps = {
  startDate: new Date('3000/10/10'),
  dayAmount: 3,
  title: '',
  tag: '',
  peopleRequired: 10,
  gottenBonus: 0,
  meals: []
};

export const createList_init = {
  startDate: null,
  dayAmount: null,
  title: null,
  tag: null,
  peopleRequired: null,
  gottenBonus: null,
  meals: []
};