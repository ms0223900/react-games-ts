declare module 'bullet-note' {
  export enum MESSAGE_TYPE {
    'URGENT' = 'URGENT',
    'TODO' = 'TODO',
    'REVIEW' = 'REVIEW',
  }

  export interface TagItem {

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

  export interface BasicMessage {
    content: string
    tagList: TagItem[]
    createdAt: Date | string
    dateTagList: DateTagItem[]
  }

  export interface ToDoMessageItemProps {
    type: MESSAGE_TYPE.TODO
    status: TodoMessageStatus
    message: BasicMessage
  }

  export interface UrgentMessageItemProps {
    type: MESSAGE_TYPE.URGENT
    status: UrgentMessageStatus
    message: BasicMessage
  }

  export type MessageItem =  ToDoMessageItemProps | UrgentMessageItemProps
  export type MessageList = MessageItem[]

  export interface MessageListWithDate {
    date: Date | string
    messageList: MessageList
  }

  export interface NoteBlockItemProps extends MessageListWithDate {
  }

  export interface NoteBlockListProps {
    messageList: MessageList
  }

  export interface DateTitleProps {
    date: Date | string
  }
}