import { KabuTrendType, SingleWeekKabuRecord } from "../types";

const reboundTrendSeperatingTimes = 1.4;

class HandleKabuTrends {
  static getThisWeekPrices(otherDaysPrices: SingleWeekKabuRecord['otherDaysPrice']): number[] {
    return [
      otherDaysPrices.sun.morning,

      otherDaysPrices.mon.morning,
      otherDaysPrices.mon.afternoon,

      otherDaysPrices.tue.morning,
      otherDaysPrices.tue.afternoon,

      otherDaysPrices.wed.morning,
      otherDaysPrices.wed.afternoon,

      otherDaysPrices.thu.morning,
      otherDaysPrices.thu.afternoon,

      otherDaysPrices.fri.morning,
      otherDaysPrices.fri.afternoon,

      otherDaysPrices.sat.morning,
      otherDaysPrices.sat.afternoon,
    ];
  }
  
  static getKabuTrendPredictionsFromKabuValue(kabuValue: number | string): KabuTrendType[] {
    const K = Number(kabuValue);
    if(K >= 91) {
      return ['wave', 'forth'];
    }
    else if(K >= 85) {
      return ['third', 'forth', 'decrement'];
    } 
    else if(K >= 80) {
      return ['third', 'forth'];
    }
    else if(K >= 60) {
      return ['wave', 'forth'];
    }
    return ['forth'];
  }

  static checkHaveDecrement(prices: number[]) {
    let res = false;
    for (let i = 0; i < prices.length; i++) {
      const price = prices[i];
      const priceNext = prices[i + 1];
      if(priceNext - price < 0) {

      }
    }
  }

  static checkThisWeekKabuHaveRebound(prices: number[]) {
    let reboundIndex = -1;

  }
}

export default HandleKabuTrends;