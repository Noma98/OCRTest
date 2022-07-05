import { AxiosError } from 'axios';
import React, { useCallback, useReducer } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQuery } from 'react-query';

import { cancelRefund, getCustomerRefundList } from '@/api/refund';
import LoadingView from '@/components/common/LoadingView';
import ErrorController from '@/controllers/ErrorController';
import { useAppSelector } from '@/hooks/useReduxHooks';
import Presenter from '@/screens/CancelMode/CancelList/Presenter';
import {
  IRefundCancelPayload,
  IRefundLimitResponse,
  IRefundResponse,
} from '@/types/api/refund';
import { IError } from '@/types/common';
import { CancelListScreenProps } from '@/types/navigation';
import {
  ICustomerRefundState,
  IFilterOptions,
  IRefundItem,
  IRefundItems,
} from '@/types/refund';
import { IUserInfo } from '@/types/user';
import { getTodayAndLastMonth } from '@/utils/format';

const [formatedToday, oneMonthAgo] = getTodayAndLastMonth();

const initialState: ICustomerRefundState = {
  modalVisible: false,
  filterVisible: false,
  filterOptions: {
    isLatest: true,
    isMonthly: true,
    startDate: oneMonthAgo,
    endDate: formatedToday,
  },
  selected: null,
};
type ActionType =
  | 'TOGGLE_MODAL'
  | 'TOGGLE_FILTER_MODAL'
  | 'SET_FILTER'
  | 'SET_SELECTED';
interface IAction {
  type: ActionType;
  payload?: any;
}
function cancelReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case 'TOGGLE_FILTER_MODAL':
      return {
        ...state,
        filterVisible: !state.filterVisible,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filterOptions: action.payload,
      };
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload,
      };
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}
interface IProps {
  route: CancelListScreenProps['route'];
  navigation: CancelListScreenProps['navigation'];
}

function CancelList({ route, navigation }: IProps) {
  const [state, dispatch] = useReducer(cancelReducer, initialState);
  const { filterOptions, filterVisible, modalVisible, selected } = state;
  const { startDate, endDate, isLatest } = filterOptions;
  const { franchiseeIndex, employeeIndex, userSelector } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );
  const inquiryInfo = useAppSelector(
    state => state.refund.inquiryInfo,
  ) as IRefundLimitResponse;
  const { payload } = route.params;

  // TODO: #5 환급 리스트 조회 요청 API 날짜 필터링
  const { isLoading, data } = useQuery<IRefundItems[], AxiosError<IError>>(
    ['cancelRefundList', isLatest, startDate, endDate],
    () =>
      getCustomerRefundList({
        franchiseeIndex,
        refundCustomerDateRequest: {
          orderCheck: isLatest ? 'DESC' : 'ASC',
          startDate,
          endDate,
        },
        refundCustomerInfoRequest: {
          name: payload.lastName,
          nationality: payload.nationality,
          passportNumber: payload.passportNumber,
        },
      }),
    {
      retry: false,
      enabled: Boolean(franchiseeIndex),
      onError: err => {
        err.response && Alert.alert('KTP', err?.response?.data?.message);
      },
    },
  );
  const mutation = useMutation<
    IRefundResponse,
    AxiosError<IError>,
    IRefundCancelPayload
  >(cancelRefundPayload => cancelRefund(cancelRefundPayload), {
    retry: false,
    onError: error => {
      const response = error.response;
      if (response) {
        const errorController = new ErrorController();
        if (errorController.checkIsRefundError(response.data?.message)) {
          Alert.alert(
            'KTP',
            errorController.getRefundAlertMessage(response.data?.message),
          );
          return;
        } else {
          Alert.alert(
            'KTP',
            `포스기에서 해당 건을 '결제 취소'하면\n자동으로 환급이 취소됩니다.`,
            [{ text: '확인' }],
          );
        }
      }
    },
    onSuccess: () => {
      dispatch({ type: 'SET_SELECTED', payload: null });
      if (selected) {
        navigation.navigate('CancelResult', {
          refund: selected,
          referrer: 'Cancel',
        });
      }
    },
  });

  const onSelect = useCallback((refund: IRefundItem) => {
    dispatch({
      type: 'SET_SELECTED',
      payload: selected?.refundIndex !== refund.refundIndex ? refund : null,
    });
  }, []);

  const toggleFilter = useCallback(() => {
    dispatch({ type: 'TOGGLE_FILTER_MODAL' });
  }, []);

  const setFilterOptions = useCallback((options: IFilterOptions) => {
    dispatch({ type: 'SET_FILTER', payload: options });
  }, []);

  const modalClose = useCallback(() => {
    dispatch({ type: 'TOGGLE_MODAL' });
  }, []);

  const modalOpen = useCallback(() => {
    if (!selected) {
      return;
    }
    dispatch({ type: 'TOGGLE_MODAL' });
  }, [selected]);

  // ========== 환급 취소 API 요청 =========
  const onConfirm = async () => {
    dispatch({ type: 'TOGGLE_MODAL' });
    if (selected) {
      mutation.mutate({
        customerIndex: inquiryInfo.customerIndex,
        refundIndex: +selected.refundIndex,
        userSelector,
        franchiseeIndex,
        employeeIndex,
      });
      dispatch({ type: 'SET_SELECTED', payload: null });
    } else {
      Alert.alert('KTP', '취소할 환급 내역을 선택해주세요.');
    }
  };

  if (isLoading) {
    return <LoadingView isOpacity />;
  }
  return (
    <Presenter
      refundList={data || []}
      modalVisible={modalVisible}
      onSelect={onSelect}
      modalClose={modalClose}
      modalOpen={modalOpen}
      onConfirm={onConfirm}
      toggleFilter={toggleFilter}
      selected={selected}
      isLoading={mutation.isLoading}
      filterVisible={filterVisible}
      setFilterOptions={setFilterOptions}
      filterOptions={filterOptions}
    />
  );
}

export default CancelList;
