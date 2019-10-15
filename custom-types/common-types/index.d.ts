declare module 'common-types' {
  export type SingleMeal = {
    id: number | string
    name: string
    imgSrc: string
    price: number
    [x: string]: any
  }
}