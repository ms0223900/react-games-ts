export type OtherDayType = 
  'mon' |
  'tue' |
  'wed' |
  'thu' |
  'fri' |
  'sat'

export type DayTimeType = 'morning' | 'afternoon'

export type SingleOtherDayPrices = {
  [dayTime in DayTimeType]: number
}

export interface DayAndTime {
  day: OtherDayType,
  dayTime: DayTimeType
}

export interface SingleWeekKabuRecord {
  startDate: Date | string
  originSundayPrice: number
  otherDaysPrice: {
    [day in OtherDayType]: SingleOtherDayPrices
  }
}

export type InputOnChangeFn = (dayAndTime: DayAndTime, value: string) => any

export interface InputItemContainerProps {
  id: string
  day: OtherDayType
  dayTime: DayTimeType
  value: string
  onChange?: InputOnChangeFn
}