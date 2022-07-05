import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components/native';

import { getCMSReport } from '@/api/user';
import arrowActive from '@/assets/icons/VatReport/chevron_right_black.png';
import arrow from '@/assets/icons/VatReport/chevron_right_gray.png';
import Button from '@/components/common/Button';
import DashedItem from '@/components/common/DashedItem';
import FlexWrap from '@/components/common/FlexWrap';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IGetCMSReportResponse } from '@/types/api/user';
import { IError } from '@/types/common';
import { VatReportScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { comma, formatCMSReportPeriod } from '@/utils/format';

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
interface IProps {
  navigation: VatReportScreenProps['navigation'];
}
function CMSReport({ navigation }: IProps) {
  const { franchiseeIndex, signUpDate } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;
  const [period, setPeriod] = useState<string>(
    formatCMSReportPeriod() as string,
  );
  const { data, isLoading } = useQuery<
    IGetCMSReportResponse,
    AxiosError<IError>
  >(
    ['vatInfo', franchiseeIndex, period],
    () => getCMSReport({ franchiseeIndex, requestDate: period }),
    { retry: false },
  );
  const goToPrev = () => {
    if (period.slice(2, 4) === '01') {
      setPeriod(prevState => (+prevState - 89).toString());
    } else {
      setPeriod(
        prevState =>
          `${+prevState - 1 < 10 ? '0' : ''}${(+prevState - 1).toString()}`,
      );
    }
  };
  const goToNext = () => {
    if (period.slice(2, 4) === '12') {
      setPeriod(prevState => (+prevState + 89).toString());
    } else {
      setPeriod(
        prevState =>
          `${+prevState + 1 < 10 ? '0' : ''}${(+prevState + 1).toString()}`,
      );
    }
  };
  if (isLoading || !data) {
    return <LoadingView isOpacity />;
  }
  return (
    <Wrapper dir="column">
      <Container>
        <PeriodContainer>
          <IconButton
            onPress={goToPrev}
            disabled={
              formatCMSReportPeriod(signUpDate) === period ? true : false
            }>
            <Icon
              source={
                formatCMSReportPeriod(signUpDate) === period
                  ? arrow
                  : arrowActive
              }
              reversal
            />
          </IconButton>
          <Text
            size="18"
            text={`${period.slice(0, 2)}년 ${period.slice(2, 4)}월`}
            weight="500"
            margin={[20, 11]}
          />
          <IconButton
            onPress={goToNext}
            disabled={formatCMSReportPeriod() === period ? true : false}>
            <Icon
              style={{ marginTop: 1 }}
              source={formatCMSReportPeriod() === period ? arrow : arrowActive}
            />
          </IconButton>
        </PeriodContainer>
        <DashedItem label="환급건수" value={`${data.totalCount}건`} />
        <DashedItem label="판매금액" value={`${comma(data.totalAmount)}원`} />
        <DashedItem label="부가가치세" value={`${comma(data.totalVat)}원`} />
        <DashedItem
          label="환급수수료"
          value={`${comma(data?.totalCommission)}원`}
        />
      </Container>
      <Button
        title="CMS 청구내역서 보기"
        active={data?.totalCount !== '0'}
        onPress={() =>
          navigation.navigate('CMSReportDetail', {
            franchiseeIndex,
            periodNum: period,
          })
        }
      />
    </Wrapper>
  );
}

export default CMSReport;
