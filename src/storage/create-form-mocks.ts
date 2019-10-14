import { CreateGrouponCreateListProps } from "app/groupon-form/create-groupon-create-list";
import { meal_mockData } from "app/common-components/storage/mockData";

export const tags_mockData = [
  'aa',
  'bb'
];

export const createList_mockData: CreateGrouponCreateListProps = {
  startDate: new Date('2019/10/10'),
  dayAmount: 3,
  title: 'hello meal',
  tag: 'say hello',
  peopleRequired: 10,
  gottenBonus: 100,
  meals: [meal_mockData]
};