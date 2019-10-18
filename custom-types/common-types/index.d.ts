declare module 'common-types' {
  type ID = string | number
  export type Action = {
    type: string
    payload: any
  }

  export type SingleMeal = {
    id: ID
    name: string
    imgSrc: string
    price: number
    [x: string]: any
  }

  export type UserInfo = {
    // id: ID
    username: string | undefined | null
  }
}