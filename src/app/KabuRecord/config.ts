import { GridRatio } from "common-types";
import { KabuTrendType } from "./types";

export const localStorageKey = 'KabuForm';

export const otherDayKabuItemWidthRatios = [2, 5, 5] as GridRatio[];

export const kabuTrends: {
  [t in KabuTrendType]: string
} = {
  decrement: '遞減型',
  wave: '波型',
  third: '三期型',
  forth: '四期型'
};