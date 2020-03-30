import { InputItemContainerProps, DayAndTime, DayTimeType, SingleOtherDayPrices, OtherDayType, KabuTrendType } from "../types";

export interface OtherDayKabuItemProps {
  date?: string
  day: OtherDayType
  dayTimePrices: SingleOtherDayPrices
  onChange?: InputItemContainerProps['onChange']
}

export interface OtherDayKabuFormProps {
  onChange?: InputItemContainerProps['onChange']
  otherDayList: OtherDayKabuItemProps[]
}

export interface KabuTrendTypePredictionProps {
  kabuTrendTypes: KabuTrendType[]
}