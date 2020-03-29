import { InputItemContainerProps, DayAndTime, DayTimeType, SingleOtherDayPrices, OtherDayType } from "../types";

export interface OtherDayKabuItemProps {
  day: OtherDayType
  dayTimePrices: SingleOtherDayPrices
  onChange?: InputItemContainerProps['onChange']
}

export interface OtherDayKabuFormProps {
  onChange?: InputItemContainerProps['onChange']
  otherDayList: OtherDayKabuItemProps[]
}