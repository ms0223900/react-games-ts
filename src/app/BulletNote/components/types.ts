import { MessageList, BasicMessage, MESSAGE_TYPE, TodoMessageStatus, UrgentMessageStatus } from "../types";
import { Callback } from "common-types";
import { ReactNode } from "react";

export interface NotePartProps {
  messageList: MessageList
  setMessageFromDB: () => any
}

export interface MessageItemButtonsProps {
  onDelete: Callback
}

export interface BasicMessageItemProps extends MessageItemButtonsProps {
  message: BasicMessage
}

export interface DefaultMessageItemProps extends Omit<BasicMessageItemProps, 'onDelete'>{
  type: MESSAGE_TYPE.DEFAULT
  status: {}
}

export interface ToDoMessageItemProps extends Omit<DefaultMessageItemProps, 'type'> {
  type: MESSAGE_TYPE.TODO
  status: TodoMessageStatus
}


export interface UrgentMessageItemProps extends Omit<DefaultMessageItemProps, 'type'> {
  type: MESSAGE_TYPE.URGENT
  status: UrgentMessageStatus
}

export interface MessageItemWrapperProps extends BasicMessageItemProps {
  children: ReactNode
}