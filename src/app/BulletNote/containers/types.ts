import { MessageItemWrapperProps, BasicMessageItemProps } from "../components/types";
import { TagNoteBlockItemProps } from "../types";

export interface InputPartContainerProps {
  addMessageFn: (rawMessage: string) => any
}

export interface MessageItemWrapperContainerProps extends MessageItemWrapperProps {

}

export interface MessageItemWrapperContainerWithCtxProps extends Omit<
MessageItemWrapperProps, 'onDelete'> {
  
}

export interface TagNoteBlockItemContainerProps extends Omit<TagNoteBlockItemProps, 'onToggleTodo'> {
  toggleTodoAction: (id: string, isDone: boolean) => any
}

export interface TagNoteBlockItemContainerWithCtxProps extends Omit<TagNoteBlockItemContainerProps, 'toggleTodoAction'> {
}

export interface BasicMessageItemContainerProps extends Omit<BasicMessageItemProps, 'onEditMessage'> {
  editActionFn: (id: string, newMessage: string) => any
}
export interface BasicMessageItemContainerWithCtxProps extends Omit<BasicMessageItemContainerProps, 'editActionFn'> {
  
}