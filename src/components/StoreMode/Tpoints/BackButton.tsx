import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigation, useRoute } from '@react-navigation/core';
import styled from 'styled-components/native';

import getHeaderTitle from '@/utils/getHeaderTitle';
import { leftArrow } from '@/utils/getImages';
import { isAndroid } from '@/utils/check';

const ButtonWrapper = styled.TouchableOpacity`
  margin-left: ${isAndroid() ? '30px' : '20px'};
`;

const Arrow = styled.Image`
  width: 25px;
  height: 25px;
`;

function BackButton() {
  const route = useRoute();
  const navigation = useNavigation();
  const title = getHeaderTitle(route);
  const queryClient = useQueryClient();

  const onConditionReset = () => {
    navigation.goBack();
    if (title === 'T.POINT') {
      queryClient.removeQueries(['tpointList']);
    }
  };

  return (
    <ButtonWrapper onPress={onConditionReset}>
      <Arrow source={leftArrow} />
    </ButtonWrapper>
  );
}

export default BackButton;
