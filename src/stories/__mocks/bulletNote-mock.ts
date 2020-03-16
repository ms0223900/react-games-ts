import { BasicMessage, ToDoMessageItemProps, MESSAGE_TYPE } from "bullet-note";

export const basicMessage: BasicMessage = {
  content: '',
  tagList: [],
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