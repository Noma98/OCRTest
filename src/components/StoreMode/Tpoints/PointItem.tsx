import React from 'react';
import styled, { css } from 'styled-components/native';

import Text from '@/components/common/Text';
import { ITPoint } from '@/types/point';
import { comma } from '@/utils/format';

const Container = styled.View<{ isLast: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f6f7;
  ${props =>
    !props.isLast &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: #e5e6e8;
    `}
`;

const Wrapper = styled.View<{ isEnd?: boolean }>`
  justify-content: center;
  align-items: ${props => (props.isEnd ? 'flex-end' : 'flex-start')};
`;

const Datetime = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #5f6165;
`;

const Point = styled.Text<{ isCancel: boolean }>`
  font-size: 18px;
  line-height: 26px;
  color: ${props =>
    props.isCancel ? props.theme.colors.error : props.theme.colors.main};
`;

interface IProps extends ITPoint {
  isLast?: boolean;
}

function PointItem({
  datetime,
  pointStatus,
  value,
  totalAmount,
  isLast = false,
}: IProps) {
  const formattedDatetime =
    datetime.slice(0, 11) + datetime.slice(11, 16).replace(/\./g, ':');

  const getFormattedText = () => {
    let message = '적립';
    switch (pointStatus) {
      case 'SCHEDULED':
      case 'SCHEDULED_CANCEL':
        message = '적립 예정';
        break;
      case 'WITHDRAW':
        message = '출금';
        break;
      case 'CANCEL':
        message = '적립 예정 취소';
        break;
    }
    return message;
  };

  return (
    <Container isLast={isLast}>
      <Wrapper>
        <Text
          marginBottom={10}
          text={
            pointStatus === 'WITHDRAW'
              ? 'T.POINT 출금'
              : `${comma(totalAmount)}원 ${
                  pointStatus === 'CANCEL' ? '결제 취소' : '결제'
                }`
          }
        />
        <Datetime>{formattedDatetime}</Datetime>
      </Wrapper>
      <Wrapper isEnd>
        <Point isCancel={['CANCEL', 'WITHDRAW'].includes(pointStatus)}>
          {comma(value)} P
        </Point>
        <Text text={getFormattedText()} />
      </Wrapper>
    </Container>
  );
}

export default PointItem;
