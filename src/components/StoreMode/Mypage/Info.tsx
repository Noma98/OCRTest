import React from 'react';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';
import CommaWithSuffix from '@/components/common/CommaWithSuffix';
import { comma } from '@/utils/format';
import { arrow } from '@/utils/getImages';
interface InfoProps {
  totalPoint: number;
  totalSalesAmount: number;
}

function Info({ totalPoint, totalSalesAmount }: InfoProps) {
  const navigation = useNavigation();

  const goToSalesAnalysis = () => {
    navigation.navigate('SalesAnalysis');
  };

  const goToTpoint = () => {
    navigation.navigate('Tpoint');
  };

  return (
    <InfoWrap>
      <PriceWrap
        onPress={goToSalesAnalysis}
        underlayColor="#F5F6F7"
        style={{ borderRightWidth: 1, borderRightColor: '#e5e6e8' }}>
        <>
          <Wrap>
            <Text text="매출분석" marginBottom={4} />
            <CommaWithSuffix price={comma(totalSalesAmount)} isColored />
          </Wrap>
          <Icon source={arrow} />
        </>
      </PriceWrap>
      <PriceWrap underlayColor="#F5F6F7" onPress={goToTpoint}>
        <>
          <Wrap>
            <Text text="T.POINT" marginBottom={4} />
            <CommaWithSuffix price={comma(totalPoint)} isColored suffix="P" />
          </Wrap>
          <Icon source={arrow} />
        </>
      </PriceWrap>
    </InfoWrap>
  );
}

const Wrap = styled.View``;
const InfoWrap = styled(FlexWrap)`
  border-bottom-width: 8px;
  border-bottom-color: #edeeef;
  border-top-width: 8px;
  border-top-color: #edeeef;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;
const PriceWrap = styled.TouchableHighlight`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 14px 20px 20px;
`;
export default Info;
