import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { InfiniteData } from 'react-query';
import styled from 'styled-components/native';

import BodyWrap from '@/components/common/BodyWrap';
import PointList from '@/components/StoreMode/Tpoints/PointList';
import PointsAccruedDetails from '@/components/StoreMode/Tpoints/PointsAccruedDetails';
import PointsHeld from '@/components/StoreMode/Tpoints/PointsHeld';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { ITpointListResponse } from '@/types/api/store';
import { PeriodType } from '@/types/point';
import { IUserInfo } from '@/types/user';
import { isAndroid } from '@/utils/check';

const Container = styled.View`
  flex: 1;
  background-color: #f5f6f7;
  margin: ${isAndroid() ? '0' : '0 -20px'};
  padding: 0 20px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 20px;
`;

const EmptyNotification = styled.Text`
  font-size: 15px;
  line-height: 22px;
  color: #5f6165;
`;

interface TpointPresenterProps {
  tpointList: InfiniteData<ITpointListResponse> | undefined;
  period: PeriodType;
  onChangePeriod: (period: PeriodType) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

function TpointPresenter({
  period,
  onChangePeriod,
  tpointList,
  onScroll,
}: TpointPresenterProps) {
  const { franchiseeStatus } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );
  return (
    <BodyWrap onScroll={onScroll} isPadding={false}>
      <PointsHeld />
      <PointsAccruedDetails
        startDate={tpointList?.pages[0].startDate}
        endDate={tpointList?.pages[0].endDate}
        period={period}
        onClick={onChangePeriod}
      />
      {franchiseeStatus !== 'ACCEPTED' ? (
        <Container>
          <EmptyContainer>
            <EmptyNotification>
              가맹점 승인 후 이용할 수 있습니다.
            </EmptyNotification>
          </EmptyContainer>
        </Container>
      ) : (
        tpointList && <PointList tpointList={tpointList?.pages} />
      )}
    </BodyWrap>
  );
}

export default TpointPresenter;
