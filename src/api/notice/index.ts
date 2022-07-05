import api from '@/api';
import {
  IGetNoticeDetailResponse,
  IgetNoticeListResponse,
} from '@/types/api/notice';

export const getNoticeList = async () => {
  const res = await api.getAxios<IgetNoticeListResponse, null>('/notice');
  return res.data;
};
export const getNoticeDetail = async (noticeIndex: number) => {
  const res = await api.getAxios<IGetNoticeDetailResponse, null>(
    `/notice/${noticeIndex}`,
  );
  return res.data;
};
