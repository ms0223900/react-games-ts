export const getAnotherDay = (date: Date, days=1) => (
  new Date(date.setDate(date.getDate() + days))
);

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

