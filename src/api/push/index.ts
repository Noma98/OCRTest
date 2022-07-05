import api from '@/api';
import {
  IPushListsPayload,
  IPushListsResponse,
  IUnreadAlermCountResponse,
} from '@/types/api/push';

export const getPushLists = async (franchiseeIndex: number) => {
  const res = await api.getAxios<IPushListsResponse, IPushListsPayload>(
    `/push/${franchiseeIndex}`,
  );
  return res.data;
};

export const updatePushIsRead = async (pushIndex: number) => {
  const res = await api.patchAxios<number, null, null>(`/push/${pushIndex}`, {
    isRead: true,
  });
  return res.status;
};

export const getUnreadAlert = async (franchiseeIndex: number) => {
  const res = await api.getAxios<IUnreadAlermCountResponse, null>(
    `/push/${franchiseeIndex}/count`,
  );
  return res.data.count;
};
