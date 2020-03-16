declare module 'bullet-note' {
  
  enum MESSAGE_TYPE {
    'URGENT' = 'URGENT',
    'TODO' = 'TODO',
    'REVIEW' = 'REVIEW',
  }

  interface TagItem {

  }

  interface DateTagItem {
    date: Date
  }

  interface UrgentMessageStatus {
    dueTime: Date
    urgentLevel: number
    name: string
  }

  interface TodoMessageStatus {
    name: string
    isDone?: boolean
    dueTime?: Date | string
  }

  interface BasicMessage {
    content: string
    tagList: TagItem[]
    createdAt: Date | string
    dateTagList: DateTagItem[]
  }

  interface ToDoMessageItemProps {
    type: MESSAGE_TYPE.TODO
    status: TodoMessageStatus
    message: BasicMessage
  }

  interface UrgentMessageItemProps {
    type: MESSAGE_TYPE.URGENT
    status: UrgentMessageStatus
    message: BasicMessage
  }

  type MessageItem =  ToDoMessageItemProps | UrgentMessageItemProps
  type MessageList = MessageItem[]

  interface NoteProps {
    messageList: MessageList
  }
}