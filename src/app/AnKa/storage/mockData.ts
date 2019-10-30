import { MessageProps } from "app/AnKa/components/Reply";
import { SingleAnkaElementProps } from "../components/AnkaElement";
import { AnkaPageProps } from "../components/AnkaPage";
import { SingleMessage, SingleMessageData } from "anka-types";

export const ankaElement_dice_mockData: SingleAnkaElementProps = {
  type: 'dice',
  number: 3
};
export const ankaElement_color_mockData: SingleAnkaElementProps = {
  type: 'color',
  number: 2
};
export const ankaElement_floor_mockData: SingleAnkaElementProps = {
  type: 'floor',
  number: 6
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
  id: '1',
  username: 'dd132aa'
};

export const reply_mockData: SingleMessageData = {
  id: 2,
  userId: '3',
  username: 'aa123',
  content: 'hi\nhi(_dice_3)',
  created_at: new Date('2019/10/31 10:31'),
};
export const reply_longContent_mockData: SingleMessageData = {
  id: 2,
  userId: '3',
  username: 'aa123',
  content: '《死亡擱淺》是以(_dice_3)系列聞名的遊戲創作者小島秀夫單飛後的首款新作。突破遊戲類型框架，打造出顛覆傳統的遊戲體驗。遊戲邀請知名演員諾曼·李杜斯飾演主角山姆·布橋斯，故事敘述他勇闖因「(_color_2)」而面目全非的世界，背負著未來希望的碎片，踏上旅途，一步步重新連繫這個分崩離析的世界。',
  created_at: new Date('2019/10/31 10:31'),
};

export const reply_host_mockData: SingleMessageData = {
  id: 1,
  userId: '1',
  username: 'aa123',
  content: 'hi\nhi(_dice_3)(_color_2)',
  created_at: new Date('2019/10/31 10:31'),
};

export const replies_mockData = [
  reply_host_mockData,
  reply_mockData,
  {
    ...reply_longContent_mockData,
    id: 3,
    // ankaElements: [ankaElement_dice_mockData],
  },
];

export const ankaElementString_mockData = '(_dice_2)';
export const message_input_mockData = 'first(_dice)(_color)second(_color)(_dice)';
export const message_queried_mockData = ['(_dice_2)Hisjdakjd;ak(_dice_2)(_color_1)(_sdadssss(XDDD', 'fasfa'];

export const ankaPage_mockData: AnkaPageProps = {
  ankaHostId: user03_host_mockData.id,
  // queriedParsedMessages: replies_mockData,
};

