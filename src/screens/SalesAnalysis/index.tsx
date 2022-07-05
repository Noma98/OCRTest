import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import { getSalesInfo } from '@/api/store';
import BodyWrap from '@/components/common/BodyWrap';
import LoadingView from '@/components/common/LoadingView';
import Calendar from '@/components/Modal/Calendar';
import ButtonGroup from '@/components/StoreMode/SalesAnalysis/ButtonGroup';
import DateBox from '@/components/StoreMode/SalesAnalysis/DateBox';
import SalesInfo from '@/components/StoreMode/SalesAnalysis/SalesInfo';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { ISalesAnalysis, SalesAnalysisPeriodType } from '@/types/refund';
import { IUserInfo } from '@/types/user';

function SalesAnalysis() {
  const [CalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [period, setPeriod] = useState<SalesAnalysisPeriodType>('TODAY');
  const { franchiseeIndex, franchiseeStatus } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;

  const naivgation = useNavigation();
  const { isLoading, data: salesInfo } = useQuery<ISalesAnalysis[], Error>(
    ['salesAnalysis', period],
    () =>
      getSalesInfo({
        franchiseeIndex,
        period,
      }),
    { retry: false },
  );

  const handleClickRightArrow = (saledate: string) => {
    naivgation.navigate('RefundStatus', { saleDate: saledate });
  };

  const CloseCalendarModal = () => {
    setCalendarModalVisible(false);
  };

  const OpenCalendarModal = useCallback(() => {
    setPeriod('CUSTOM');
    setCalendarModalVisible(true);
  }, []);

  const handlePeriod = useCallback(
    (selectedPeriod: SalesAnalysisPeriodType) => {
      setPeriod(selectedPeriod);
    },
    [],
  );

  return (
    <>
      <BodyWrap>
        <Calendar
          modalVisible={CalendarModalVisible}
          onRequestClose={CloseCalendarModal}
          onConfirm={() => {}}
        />
        <ButtonGroup
          period={period}
          onClick={handlePeriod}
          onClickPeriod={OpenCalendarModal}
        />
        <DateBox period={period} />
        <SalesInfo
          onPress={handleClickRightArrow}
          salesInfo={salesInfo || []}
          isNotApproved={franchiseeStatus !== 'ACCEPTED'}
        />
      </BodyWrap>
      {isLoading && <LoadingView isOpacity />}
    </>
  );
}

export default SalesAnalysis;
