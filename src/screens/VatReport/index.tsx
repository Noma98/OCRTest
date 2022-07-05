import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components/native';

import { getVatReportList } from '@/api/user';
import arrowActive from '@/assets/icons/VatReport/chevron_right_black.png';
import arrow from '@/assets/icons/VatReport/chevron_right_gray.png';
import Button from '@/components/common/Button';
import DashedItem from '@/components/common/DashedItem';
import FlexWrap from '@/components/common/FlexWrap';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IVatReportResponse } from '@/types/api/user';
import { IError } from '@/types/common';
import { VatReportScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { comma, formatVatReportPeriod } from '@/utils/format';
interface IProps {
  navigation: VatReportScreenProps['navigation'];
}
function VatReport({ navigation }: IProps) {
  const { franchiseeIndex, signUpDate } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;
  const [period, setPeriod] = useState<string>(
    formatVatReportPeriod() as string,
  );

  const { data, isLoading } = useQuery<IVatReportResponse, AxiosError<IError>>(
    ['vatInfo', franchiseeIndex, period],
    () => getVatReportList({ franchiseeIndex, requestDate: period }),
    { retry: false },
  );
  const goToPrev = () => {
    if (period.slice(-1) === '1') {
      setPeriod(prevState => (+prevState - 9).toString());
    } else {
      setPeriod(prevState => (+prevState - 1).toString());
    }
  };
  const goToNext = () => {
    if (period.slice(-1) === '1') {
      setPeriod(prevState => (+prevState + 1).toString());
    } else {
      setPeriod(prevState => (+prevState + 9).toString());
    }
  };
  if (isLoading || !data) {
    return <LoadingView isOpacity />;
  }
  const onPress = () => {
    if (formatVatReportPeriod() === period) {
      Alert.alert(
        'KTP',
        `이번 반기의 환급실적명세서는 부가세 신고기간에 확인할 수 있습니다.`,
        [{ text: '확인' }],
      );
      return;
    }
    navigation.navigate('VatReportDetail', {
      franchiseeIndex,
      periodNum: period,
    });
  };
  return (
    <Wrapper dir="column">
      <Container>
        <PeriodContainer>
          <IconButton
            onPress={goToPrev}
            disabled={
              formatVatReportPeriod(signUpDate) === period ? true : false
            }>
            <Icon
              source={
                formatVatReportPeriod(signUpDate) === period
                  ? arrow
                  : arrowActive
              }
              reversal
            />
          </IconButton>
          <Text
            size="18px"
            text={`${period.slice(0, 2)}년 ${period.slice(-1)}기`}
            weight="500"
            margin={[20, 8]}
          />
          <IconButton
            onPress={goToNext}
            disabled={formatVatReportPeriod() === period ? true : false}>
            <Icon
              style={{ marginTop: 1 }}
              source={formatVatReportPeriod() === period ? arrow : arrowActive}
            />
          </IconButton>
        </PeriodContainer>
        <DashedItem label="판매건수" value={`${data.totalCount}건`} />
        <DashedItem label="판매금액" value={`${comma(data.totalAmount)}원`} />
        <DashedItem label="공급가" value={`${comma(data.totalSupply)}원`} />
        <DashedItem label="부가가치세" value={`${comma(data.totalVat)}원`} />
      </Container>
      <Button
        title="환급실적명세서 보기"
        active={data?.totalCount !== '0'}
        onPress={onPress}
      />
    </Wrapper>
  );
}

const PeriodContainer = styled(FlexWrap)`
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;
const IconButton = styled.TouchableOpacity``;
const Icon = styled.Image<{ reversal?: boolean }>`
  width: 24px;
  height: 24px;
  ${props =>
    props.reversal &&
    css`
      transform: scale(-1);
    `}
`;
const Container = styled.View``;
const Wrapper = styled(FlexWrap)`
  justify-content: space-between;
  padding: 0 20px;
  flex: 1;
`;
export default VatReport;
