export const getDaysAfterToday = (days=1) => {
  let res: Date[] = [];
  for (let i = 0; i < days; i++) {
    let anotherDay = new Date();
    anotherDay.setDate(anotherDay.getDate() + i);
    res = [
      ...res,
      anotherDay
    ];
  }
  return res;
};

