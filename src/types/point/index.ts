export type PeriodType = 'week' | 'month' | 'tmonth';

export interface ITPoint {
  datetime: string;
  value: string;
  totalAmount: string;
  pointStatus:
    | 'SAVE'
    | 'CANCEL'
    | 'SCHEDULED'
    | 'WITHDRAW'
    | 'SCHEDULED_CANCEL';
}

export interface ITPointInfo {
  startDate: string;
  endDate: string;
  pointInfoList: ITPoint[];
}
