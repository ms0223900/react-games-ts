declare module 'anka-types' {
  type ID = string | number
  type ankaElementTypesString = 'dice' | 'color' | 'floor'
   
  type MesType = 'ankaElement' | 'message'
  export type ParsedMessage_element = {
    mesType: 'ankaElement'
    type: ankaElementTypesString
    number: number
  }
  export type ParsedMessage_message = {
    mesType: 'message'
    message: string
  }
  export type ParsedSingleLineContent = (ParsedMessage_element | ParsedMessage_message)[]

  export type UserInfo = {
    id: ID
    username: string
  }
  export type BasiceMessage = {
    id: ID
    userId: ID
    username: string
    created_at: Date | string
  }
  export type SingleMessageData = BasiceMessage & {
    content: string
  }
  export type SingleMessage = BasiceMessage & {
    content: ParsedSingleLineContent[]
    ankaElements: SingleAnkaElement[]
  }

  export type SingleAnkaElement = {
    type: ankaElementTypesString
    number: number
    [x: string]: any
  }
 
  type SinglePost = {
    id: ID
    userId: ID
    username: string
    content: string
    created_at: Date | string
  }
}