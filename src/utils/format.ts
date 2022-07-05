import format from 'date-fns/format';

import { isAndroid } from 'utils/check';

export function formatRefundLimit(limit: string | null) {
  if (limit) {
    if (!isAndroid()) {
      return parseInt(limit.replace(/^0*/g, '') as string, 10).toLocaleString(
        'ko-KR',
      );
    } else {
      return limit
        ?.toString()
        .replace(/^0*/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } else {
    return '0';
  }
}

export const removeLetter = (text: string) => {
  return text.replace(/[^0-9]/g, '');
};

export const comma = (x: string | number) => {
  return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const attachedHyphens = (businessNumber: string) => {
  return (
    businessNumber.slice(0, 3) +
    '-' +
    businessNumber.slice(3, 5) +
    '-' +
    businessNumber.slice(5)
  );
};

export const formatRefundPrice = (num: string) => {
  return (parseInt(num, 10) / 11) * 0.7;
};

export const formatVatReportPeriod = (date?: string) => {
  const baseDate = date ? new Date(date) : new Date();
  const year = baseDate.getFullYear().toString().slice(2);
  const period = baseDate.getMonth() + 1 < 7 ? '1' : '2';
  return `${year}${period}`;
};
export const formatCMSReportPeriod = (date?: string) => {
  const baseDate = date ? new Date(date) : new Date();
  const year = baseDate.getFullYear().toString().slice(2);
  const month = baseDate.getMonth() + 1;
  return `${year}${month < 10 ? '0' : ''}${month}`;
};

export const getTodayAndLastMonth = () => {
  const today = new Date();
  const formatedToday = format(today, 'yyyy-MM-dd');
  const oneMonthAgo = format(
    today.setMonth(today.getMonth() - 1),
    'yyyy-MM-dd',
  );

  return [formatedToday, oneMonthAgo];
};

export const getRatioAndPercent = (curr, prev, suffix) => {
  const formattedData =
    suffix === '건'
      ? [prev.totalCount, curr.totalCount].map(item => +removeLetter(item))
      : [prev.totalActualAmount, curr.totalActualAmount].map(
          item => +removeLetter(item),
        );
  const [prevValue, currValue] = formattedData;
  const ratio = currValue / prevValue;
  const percent = ratio < 2 ? (currValue - prevValue) / prevValue : ratio;
  return [ratio, percent];
};

export const getTimeFromNow = (value: string) => {
  const today = new Date();
  let timeValue = new Date(value);
  isAndroid() && timeValue.setHours(timeValue.getHours() - 9);
  const betweenMinute = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenMinute < 1) {
    return '방금 전';
  }
  if (betweenMinute < 60) {
    return `${betweenMinute}분 전`;
  }

  const betweenHour = Math.floor(betweenMinute / 60);
  if (betweenHour < 24) {
    return `${betweenHour}시간 전`;
  }

  const betweenDay = Math.floor(betweenHour / 24);
  if (betweenDay < 8) {
    return `${betweenDay}일 전`;
  }

  return `${format(timeValue, 'MM월 dd일')}`;
};
