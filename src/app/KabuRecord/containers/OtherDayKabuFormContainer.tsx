import React, { useState, useCallback } from 'react';
import { Box } from '@material-ui/core';
import OtherDayKabuForm from '../components/OtherDayKabuForm';
import { DayAndTime, SingleWeekKabuRecord, OtherDayType } from '../types';

export const initDayPrices = {
  'morning': 0,
  'afternoon': 0,
};

export const initOtherDayPrices: SingleWeekKabuRecord['otherDaysPrice'] = {
  'mon': initDayPrices,
  'tue': initDayPrices,
  'wed': initDayPrices,
  'thu': initDayPrices,
  'fri': initDayPrices,
  'sat': initDayPrices,
};

const OtherDayKabuFormContainer = () => {
  const [dayPrices, setDayPrices] = useState(initOtherDayPrices);

  const handleChange = useCallback((dayAndTime: DayAndTime, value: string) => {
    setDayPrices(d => ({
      ...d,
      [dayAndTime.day]: {
        ...d[dayAndTime.day],
        [dayAndTime.dayTime]: Number(value),
      }
    }));
  }, []);

  const days = Object.keys(dayPrices) as OtherDayType[];
  const otherDayList = days.map(day => ({
    day,
    dayTimePrices: dayPrices[day]
  }));

  return (
    <OtherDayKabuForm
      otherDayList={otherDayList}
      onChange={handleChange}  />
  );
};

export default OtherDayKabuFormContainer;