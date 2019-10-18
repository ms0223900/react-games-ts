import { MessageProps } from "app/AnKa/Reply";
import { SingleAnkaElementProps } from "../AnkaElement";

export const ankaElement_dice_mockData: SingleAnkaElementProps = {
  type: 'dice',
  number: 3
};
export const ankaElement_color_mockData: SingleAnkaElementProps = {
  type: 'color',
  number: 2
};

export const ankaHostId_mockData = '3';
export const user01_mockData = {
  id: '1',
  username: 'aa19990919'
};
export const user02_mockData = {
  id: '5',
  username: 'ms0112233'
};
export const user03_host_mockData = {
  id: '3',
  username: 'dd132aa'
};

export const reply_mockData: MessageProps = {
  id: 2,
  userId: '1',
  username: 'aa123',
  content: 'hi\nhi',
  created_at: new Date('2019/10/31 10:31')
};

export const reply_host_mockData: MessageProps = {
  id: 1,
  userId: '3',
  username: 'aa123',
  content: 'hi\nhi',
  created_at: new Date('2019/10/31 10:31'),
  ankaElement: ankaElement_dice_mockData,
};

export const replies_mockData = [
  reply_host_mockData,
  reply_mockData,
  reply_mockData,
];
