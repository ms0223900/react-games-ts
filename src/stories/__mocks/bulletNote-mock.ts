import { BasicMessage, ToDoMessageItemProps, MESSAGE_TYPE, TagItem } from "app/BulletNote/types";

export const tagItem: TagItem = {
  id: 0,
  name: '#todo'
};

export const basicMessage: BasicMessage = {
  content: 'PlayStation 官方 Twitter 今（17）日亦宣布，研發中新一代主機「PlayStation 5（PS5）」',
  tagList: [tagItem],
  createdAt: '2020-03-16 23:20',
  dateTagList: [],
};

export const todoMessageItemProps: ToDoMessageItemProps = {
  type: MESSAGE_TYPE.TODO,
  status: {
    name: '',
    isDone: false,
    dueTime: '2020-03-16 23:20',
  },
  message: basicMessage,
};