import React from 'react';

import RefundDetailPresenter from '@/screens/SalesAnalysis/RefundDetail/Presenter';
import { RefundDetailScreenProps } from '@/types/navigation';

interface IProps {
  route: RefundDetailScreenProps['route'];
}

function RefundDetail({ route }: IProps) {
  const { refund, referrer } = route.params;

  return <RefundDetailPresenter refundDetail={refund} referrer={referrer} />;
}

export default RefundDetail;
