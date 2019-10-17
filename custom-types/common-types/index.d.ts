declare module 'common-types' {
  export type Action = {
    type: string
    payload: any
  }

  export type SingleMeal = {
    id: number | string
    name: string
    imgSrc: string
    price: number
    [x: string]: any
  }

  export type UserInfo = {
    username: string | undefined | null
  }
}