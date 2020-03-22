import { BasicMessage, MESSAGE_TYPE, TagItem, MessageList } from "app/BulletNote/types";
import { ToDoMessageItemProps } from "app/BulletNote/components/types";

export const tagItem: TagItem = {
  id: 0,
  name: '#todo'
};

export const basicMessage: BasicMessage = {
  id: '0',
  rawMessage: 'PlayStation 官方 Twitter 今（17）日亦宣布，研發中新一代主機「PlayStation 5（PS5）」',
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

export const messageList: MessageList = [
  todoMessageItemProps,
  {
    ...todoMessageItemProps,
    message: {
      ...todoMessageItemProps.message,
      id: '1',
      tagList: [{
        id: 'news',
        name: '#news',
      }, {
        id: 'todo',
        name: '#todo',
      }],
      content: '「小森旅貓」，每日累計近萬名玩家上線',
    }
  },
  {
    ...todoMessageItemProps,
    message: {
      ...todoMessageItemProps.message,
      id: '2',
      content: '《在狹窄空間打鬥》是款擁有獨特美術風格的回合制策略遊戲，融入了多部經典電影中的戰鬥動作，而玩家要善用這些動作擊退敵人。',
    }
  },
  {
    ...todoMessageItemProps,
    message: {
      ...todoMessageItemProps.message,
      id: '3',
      tagList: [{
        id: 'news',
        name: '#news',
      }],
      content: '《請問您今天要來點兔子嗎？》釋出動畫三期視覺圖 2020 年 10 月起開播',
    }
  },
  {
    ...todoMessageItemProps,
    message: {
      ...todoMessageItemProps.message,
      id: '4',
      createdAt: '2020-03-18 11:20',
    }
  },
  {
    ...todoMessageItemProps,
    message: {
      ...todoMessageItemProps.message,
      id: '5',
      createdAt: '2020-03-23 09:20',
    }
  },
];