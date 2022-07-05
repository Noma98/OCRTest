import React from 'react';

import RefundResultPresenter from '@/screens/ScanMode/RefundResult/Presenter';
import {
  RefundInquiryScreenProps,
  RefundResultScreenProps,
} from '@/types/navigation';

interface IProps {
  route: RefundResultScreenProps['route'];
  navigation: RefundInquiryScreenProps['navigation'];
}

function RefundResult({ route, navigation }: IProps) {
  const { data, referrer } = route.params;

  return (
    <RefundResultPresenter
      refundData={data}
      referrer={referrer}
      navigation={navigation}
    />
  );
}

export default RefundResult;
