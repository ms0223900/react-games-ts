declare module 'anka-types' {
  type ID = string | number
  type ankaElementTypesString = 'dice' | 'color' | 'floor'
  export type UserInfo = {
    id: ID
    username: string
  }
  export type SingleMessage = {
    id: ID
    userId: ID
    username: string
    content: string
    created_at: Date | string
    ankaElements: SingleAnkaElement[]
  }

  export type SingleAnkaElement = {
    type: ankaElementTypesString
    number: number
    [x: string]: any
  }
  
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

  type SinglePost = {
    id: ID
    userId: ID
    username: string
    content: string
    created_at: Date | string
  }
}