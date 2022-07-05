import axios from 'axios';

import api from '@/api';
import {
  ICheckBNumberPayload,
  ICheckBNumberResponse,
  ISignUpPayload,
} from '@/types/api/auth';

export const signUp = async (payload: ISignUpPayload) => {
  const res = await api.postAxios<void, ISignUpPayload, null>(
    '/sign-up',
    payload,
  );
  return res.status;
};

export const checkDuplication = async (businessNumber: string) => {
  const res = await api.getAxios<void, void>(`/validate/${businessNumber}`);
  return res.status;
};
export const checkBusinessNumber = async (payload: ICheckBNumberPayload) => {
  const res = await axios.post<ICheckBNumberResponse>(
    'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=7BNL%2FH3LcgXHdOPmpxUXTMJRnYvv1BXLKAK76lLC%2BOtWootlhEk5%2FOiDAvXAcNGneemJ%2FtImQBpORzcEG0IPhQ%3D%3D',
    payload,
  );

  return res.data;
};
