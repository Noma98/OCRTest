import React from 'react';
import styled from 'styled-components/native';
import format from 'date-fns/format';

import detailIcon from '@/assets/icons/Market/detail.png';
import FlexWrap from '@/components/common/FlexWrap';
import CommaWithSuffix from '@/components/common/CommaWithSuffix';
import DividingLine from '@/components/common/DividingLine';
import { ISalesAnalysis } from '@/types/refund';
import { isAndroid } from '@/utils/check';

const DateWrap = styled(FlexWrap)`
  margin-bottom: 11px;
  justify-content: space-between;
  align-items: center;
`;

const PriceInfoWrap = styled(FlexWrap)`
  margin-top: 20px;
`;

const InfoWrap = styled(FlexWrap)`
  padding: 0 16px 17px;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f6f7;
`;

const EmptyContent = styled(FlexWrap)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledBtn = styled.TouchableOpacity`
  padding: 4px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;
const StyledText = styled.Text`
  font-size: 16px;
  line-height: 24px;
`;
const DateText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.main};
`;
interface SalesInfoProps {
  onPress: (saleDate: string) => void;
  salesInfo: ISalesAnalysis[];
  isNotApproved: boolean;
}
function SalesInfo({ onPress, salesInfo, isNotApproved }: SalesInfoProps) {
  return salesInfo.length > 0 ? (
    <>
      {salesInfo.map(info => {
        return (
          <PriceInfoWrap dir="column" key={info.date}>
            <DateWrap>
              <DateText>
                {format(
                  isAndroid()
                    ? new Date(info.date).setHours(
                        new Date(info.date).getHours() - 9,
                      )
                    : new Date(info.date),
                  'yyyy. MM. dd',
                )}
              </DateText>
              <StyledBtn activeOpacity={1} onPress={() => onPress(info.date)}>
                <Icon source={detailIcon} />
              </StyledBtn>
            </DateWrap>
            <InfoWrap style={{ paddingTop: 19, paddingBottom: 13 }}>
              <StyledText>환급건수(취소건수)</StyledText>
              <CommaWithSuffix
                suffix="건"
                price={info.saleCount}
                bracketText={info.cancelCount}
              />
            </InfoWrap>
            <DividingLine height="1px" color="#E5E6E8" />
            <InfoWrap style={{ paddingTop: 16 }}>
              <StyledText>총상품금액</StyledText>
              <CommaWithSuffix price={info.totalAmount} />
            </InfoWrap>
            <InfoWrap>
              <StyledText>환급액</StyledText>
              <CommaWithSuffix price={info.totalRefund} />
            </InfoWrap>
            <InfoWrap>
              <StyledText>결제금액</StyledText>
              <CommaWithSuffix price={info.actualAmount} />
            </InfoWrap>
          </PriceInfoWrap>
        );
      })}
    </>
  ) : (
    <EmptyContent dir="column">
      <StyledText>
        {isNotApproved
          ? '가맹점 승인 후 이용할 수 있습니다.'
          : '환급 내역이 존재하지 않습니다.'}
      </StyledText>
    </EmptyContent>
  );
}

export default SalesInfo;
