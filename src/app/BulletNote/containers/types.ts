import { MessageItemWrapperProps } from "../components/types";

export interface InputPartContainerProps {
  addMessageFn: (rawMessage: string) => any
}

export interface MessageItemWrapperContainerProps extends MessageItemWrapperProps {

}

export interface MessageItemWrapperContainerWithCtxProps extends Omit<
MessageItemWrapperProps, 'onDelete'> {
  
}