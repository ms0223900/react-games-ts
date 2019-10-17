import { SingleMeal } from "common-types";

export const getAnotherDay = (date: Date, days=1) => {
  const newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + days));
};

export const getDaysAfterToday = (days=1, startDate?: Date) => {
  let res: Date[] = [];
  for (let i = 0; i < days; i++) {
    let anotherDay = new Date();
    if(startDate) {
      anotherDay = new Date(startDate);
    }
    anotherDay.setDate(anotherDay.getDate() + i);
    res = [
      ...res,
      anotherDay
    ];
  }
  return res;
};

export const getDateString = (date: Date) => (
  `${date.getMonth() + 1}/${date.getDate()}`
);

export const checkDatesIsSame = (date1: Date, date2: Date) => {
  if(date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth()) return true;
  return false;
};

export const getBonusFromMealsAndPeople = (mealsAmount: number, people: number) => {
  return Math.round(mealsAmount * people / 10) * 10;
};

export const composeReducers = (reducers: Object) => (state: any, action: any) => {
  let newState = state;
  const allReducers = Object.values(reducers);
  for (let i = 0; i < allReducers.length; i++) {
    const reducer = allReducers[i];
    const renewState = reducer(newState, action);
    newState = renewState;
  }
  return newState;
};

export const getPriceFromMeals = (meals: SingleMeal[], discountRatio=1) => {
  let result = 0;
  meals.forEach(m => {
    result += m.price;
  });
  return result * discountRatio;
};
