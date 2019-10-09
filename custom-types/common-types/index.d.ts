declare module 'common-types' {
  export type SingleMeal = {
    name: string
    imgSrc: string
    price: number
    [x: string]: any
  }
}