import moment from 'moment';
import {func} from "prop-types";

export function genVisitData() {
  const visitData = [];
  const beginDay = new Date().getTime();
  const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
  for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY[i],
    });
  }
  return visitData;
}

export function genSalesData() {
  const salesData = [];
  for (let i = 0; i < 12; i++) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  return salesData;
}

export function genRankingListData() {
  const rankingListData = [];
  for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
      title: `工专路 ${i} 号店`,
      total: 323234,
    });
  }
  return rankingListData;
}

export function genVisitData2() {
  const visitData = [];
  const fakeY = [1, 6, 4, 8, 3, 7, 2];
  const beginDay = new Date().getTime();
  for (let i = 0; i < fakeY.length; i++) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY[i],
    });
  }
  return visitData;
}

export function genOfflineData() {
  const offlineData = [];
  for (let i = 0; i < 10; i++) {
    offlineData.push({
      name: `Stores ${i+1}`,
      cvr: Math.ceil(Math.random() * 9) / 10,
    });
  }
  return offlineData;
}

export function genOfflineChartData() {
  const offlineChartData = [];
  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }
  return offlineChartData;
}

export function genSalesPieData() {
  return [];
}