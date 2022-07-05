import format from 'date-fns/format';
import React from 'react';
import styled, { css } from 'styled-components/native';

import badgeIcon from '@/assets/icons/Market/badge.png';
import FlexWrap from '@/components/common/FlexWrap';
import { StyledText } from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IFranchiseeInfoResponse } from '@/types/api/store';
import { IFranchiseeApplicantsStatus } from '@/types/user';
import { isAndroid } from '@/utils/check';

interface IProps {
  info: IFranchiseeInfoResponse;
}

function Name({ info }: IProps) {
  const franchiseeStatus = useAppSelector(
    state => state.user.userInfo?.franchiseeStatus,
  ) as IFranchiseeApplicantsStatus;

  return (
    <Container dir="column">
      <Wrapper>
        <NameTextWrap>
          <Text type="name">{info.storeName} </Text>
          <Text type="suffix">님</Text>
        </NameTextWrap>
        {franchiseeStatus === 'ACCEPTED' && (
          <BadgeWrapper>
            <BadgeIcon source={badgeIcon} />
            <StyledText color="#005F83" weight="500">
              가맹점 승인 완료
            </StyledText>
          </BadgeWrapper>
        )}
      </Wrapper>
      <Text type="date">
        최초 가입일{' '}
        {format(
          isAndroid()
            ? new Date(info.createdDate).setHours(
                new Date(info.createdDate).getHours() - 9,
              )
            : new Date(info.createdDate),
          'yyyy. MM. dd HH:mm',
        )}
      </Text>
    </Container>
  );
}
const Container = styled(FlexWrap)`
  margin: 28px 0 0;
  padding: 0 20px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const NameTextWrap = styled(FlexWrap)`
  align-items: flex-end;
  margin-right: 20px;
`;

const Text = styled(StyledText)<{ type: string }>`
  ${props => {
    switch (props.type) {
      case 'name':
        return css`
          color: ${props.theme.colors.main};
          font-size: 22px;
          line-height: 30px;
          font-weight: 500;
        `;
      case 'date':
        return css`
          color: #5f6165;
          font-size: 15px;
          line-height: 22px;
        `;
      case 'suffix':
        return css`
          color: #004438;
          font-size: 16px;
          line-height: 24px;
          margin: 0 0 1px;
        `;
    }
  }}
`;

const BadgeWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const BadgeIcon = styled.Image`
  width: 22px;
  height: 22px;
  margin-right: 7px;
`;
export default Name;
