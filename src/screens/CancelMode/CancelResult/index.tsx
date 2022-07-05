import React from 'react';
import { useQueryClient } from 'react-query';

import CancelResultPresenter from '@/screens/CancelMode/CancelResult/Presenter';
import { CancelResultScreenProps } from '@/types/navigation';

interface IProps {
  navigation: CancelResultScreenProps['navigation'];
  route: CancelResultScreenProps['route'];
}

function CancelResult({ navigation, route }: IProps) {
  const { refund, referrer } = route.params;
  const queryClient = useQueryClient();

  const onPress = () => {
    queryClient.invalidateQueries('cancelRefundList');
    navigation.navigate('SelectMode');
  };

  return (
    <CancelResultPresenter
      onPress={onPress}
      cancelDetail={refund}
      referrer={referrer}
    />
  );
}

export default CancelResult;
