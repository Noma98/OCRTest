import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useQuery } from 'react-query';

import { getRefundList } from '@/api/refund';
import BodyWrap from '@/components/common/BodyWrap';
import LoadingView from '@/components/common/LoadingView';
import RefundStatusList from '@/components/StoreMode/SalesAnalysis/RefundStatusList';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { RefundStatusScreenProps } from '@/types/navigation';
import { IRefundItem } from '@/types/refund';

interface IProps {
  route: RefundStatusScreenProps['route'];
}

function RefundStatus({ route }: IProps) {
  const franchiseeIndex = useAppSelector(
    state => state.user.userInfo?.franchiseeIndex,
  );
  const { saleDate } = route.params;
  const navigation = useNavigation();

  const { isLoading, data } = useQuery(
    'refundList',
    () =>
      getRefundList({
        dateFilter: 'CUSTOM',
        startDate: saleDate,
        endDate: saleDate,
        franchiseeIndex: franchiseeIndex as number,
      }),
    { retry: false },
  );

  const onPress = (refundDetail: IRefundItem) => {
    navigation.navigate('RefundDetail', {
      refund: refundDetail,
      referrer: 'Detail',
    });
  };

  if (isLoading) {
    return <LoadingView isOpacity isDark />;
  }

  return (
    <BodyWrap isPadding={false}>
      <RefundStatusList
        onPress={onPress}
        refundList={data || []}
        saleDate={saleDate}
      />
    </BodyWrap>
  );
}

export default RefundStatus;
