import { TextFieldProps, BaseTextFieldProps } from "@material-ui/core/TextField";

export type OtherDayType = 
  'sun' |
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

export interface InputItemContainerProps extends BaseTextFieldProps {
  id: string
  day: OtherDayType
  dayTime: DayTimeType
  value: string
  onChange?: InputOnChangeFn
}