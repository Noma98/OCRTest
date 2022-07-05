import { debounce } from 'lodash-es';
import React, { useCallback, useReducer, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import { getTpointList } from '@/api/store';
import LoadingView from '@/components/common/LoadingView';
import useIsCloseToBottom from '@/hooks/useIsCloseToBottm';
import { useAppSelector } from '@/hooks/useReduxHooks';
import TpointPresenter from '@/screens/Tpoint/Presenter';
import { PeriodType } from '@/types/point';
import { IUserInfo } from '@/types/user';

interface IState {
  periodType: PeriodType;
  period: {
    week: number;
    month: number;
  };
}

type ActionType = 'SET_PERIOD';
interface IAction {
  type: ActionType;
  payload?: any;
}

const initialState: IState = {
  periodType: 'week',
  period: {
    week: 1,
    month: 0,
  },
};

function periodReducer(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case 'SET_PERIOD':
      if (action.payload === 'week') {
        return {
          ...state,
          periodType: action.payload,
          period: {
            week: 1,
            month: 0,
          },
        };
      } else if (action.payload === 'month') {
        return {
          ...state,
          periodType: action.payload,
          period: {
            week: 0,
            month: 1,
          },
        };
      } else {
        return {
          ...state,
          periodType: action.payload,
          period: {
            week: 0,
            month: 3,
          },
        };
      }
    default:
      throw Error(`Unhandled type Error: ${action.type}`);
  }
}

function Container() {
  const { franchiseeIndex, franchiseeStatus } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;
  const [state, dispatch] = useReducer(periodReducer, initialState);
  const {
    period: { month, week },
    periodType,
  } = state;
  const weekPage = useRef(1);
  const monthPage = useRef(1);
  const tMonthPage = useRef(1);
  const { isCloseToBottom } = useIsCloseToBottom();

  const getPeriodPage = () => {
    switch (periodType) {
      case 'week':
        return weekPage.current;
      case 'month':
        return monthPage.current;
      case 'tmonth':
        return tMonthPage.current;
    }
  };

  const {
    data: tpointList,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['tpointList', month, week],
    ({ pageParam = 0 }) =>
      getTpointList({
        page: pageParam,
        franchiseeIndex,
        month,
        size: 10,
        week,
      }),
    {
      retry: false,
      getNextPageParam: lastPage =>
        lastPage.pointInfoList.length === 10 ? getPeriodPage() : undefined,
      enabled: franchiseeStatus === 'ACCEPTED',
    },
  );

  const onFetchMore = () => {
    fetchNextPage();
    if (hasNextPage) {
      switch (periodType) {
        case 'week':
          weekPage.current += 1;
          return;
        case 'month':
          monthPage.current += 1;
          return;
        case 'tmonth':
          tMonthPage.current += 1;
          return;
      }
    }
  };

  const debouncedFetch = debounce(onFetchMore, 500);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(event.nativeEvent)) {
      debouncedFetch();
    }
  };

  const onChangePeriod = useCallback((type: PeriodType) => {
    dispatch({ type: 'SET_PERIOD', payload: type });
  }, []);

  return (
    <>
      <TpointPresenter
        period={periodType}
        onChangePeriod={onChangePeriod}
        tpointList={tpointList}
        onScroll={onScroll}
      />
      {(isFetching || isLoading || isFetchingNextPage) && (
        <LoadingView isOpacity />
      )}
    </>
  );
}

export default Container;
