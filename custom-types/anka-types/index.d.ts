declare module 'anka-types' {
  type ID = string | number
  export type SingleMessage = {
    id: ID
    userId: ID
    username: string
    content: string
    created_at: Date
    ankaElement?: SingleAnkaElement
  }

  export type SingleAnkaElement = {
    type: string
    number: number
  }
}