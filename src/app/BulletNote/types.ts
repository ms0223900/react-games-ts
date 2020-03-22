import { ID } from "common-types";
import { ToDoMessageItemProps, UrgentMessageItemProps, DefaultMessageItemProps } from "./components/types";

type RawMessage = string

export enum MESSAGE_TYPE  {
  'DEFAULT' = 'DEFAULT',
  'URGENT' = 'URGENT',
  'TODO' = 'TODO',
  'REVIEW' = 'REVIEW',
}

export interface TagItem {
  id: ID
  name: string
}

export interface BulletTagItemProps {
  tagName: string
}

export interface BulletTagListProps {
  tagList: TagItem[]
}

export interface DateTagItem {
    date: Date
  }

export interface UrgentMessageStatus {
    dueTime: Date
    urgentLevel: number
    name: string
  }

export interface TodoMessageStatus {
  name: string
  isDone?: boolean
  dueTime?: Date | string
}

export interface SingleRawMessageFromDB {
  id: string
  rawMessage: RawMessage
}

export interface BasicMessage {
  id: string
  rawMessage: RawMessage
  content: string
  tagList: TagItem[]
  createdAt: Date | string
  dateTagList: DateTagItem[]
}

export type MessageItem = 
  ToDoMessageItemProps | 
  UrgentMessageItemProps | 
  DefaultMessageItemProps

export type MessageList = MessageItem[]

export interface MessageListWithDate {
    date: Date | string
    messageList: MessageList
  }

export interface NoteBlockItemProps extends MessageListWithDate {
  selected?: boolean
}

export interface TagNoteBlockItem {
  tagTitle: string
  messageList: MessageList
}
export type TagNoteBlockList = TagNoteBlockItem[]
export interface TagNoteBlockObj {
  [x: string]: TagNoteBlockItem
}

export interface TagNoteBlockItemProps extends TagNoteBlockItem {}
export interface TagNoteBlockListProps {
  tagNoteBlockList: TagNoteBlockList
}

export interface NoteBlockListProps {
    messageList: MessageList
  }

export interface DateTitleProps {
    date: Date | string
  }

