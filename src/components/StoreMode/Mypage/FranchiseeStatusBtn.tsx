import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import slashButton from '@/assets/icons/Etc/slashButton.png';
import { StyledText } from '@/components/common/Text';
import { IFranchiseeApplicantsStatus } from '@/types/user';

interface IProps {
  franchiseeStatus: IFranchiseeApplicantsStatus;
}

function FranchiseeStatusBtn({ franchiseeStatus }: IProps) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('FranchiseeApplication');
  };

  const onPressRejectedFranchisee = () => {
    navigation.navigate('RejectedFranchisee');
  };

  if (franchiseeStatus === 'WAIT' || franchiseeStatus === 'REAPPLIED') {
    return (
      <Container>
        <SlashButtonWrapper>
          <SlashButtonImage source={slashButton} resizeMode="stretch" />
          <AbsoluteText size="18px" lineHeight={52} weight="500">
            가맹점 승인 대기
          </AbsoluteText>
        </SlashButtonWrapper>
      </Container>
    );
  }

  if (franchiseeStatus === 'ACCEPTED') {
    return <Container />;
  }
  return (
    <Container>
      <StyledButton
        onPress={
          franchiseeStatus === 'REJECTED' ? onPressRejectedFranchisee : onPress
        }
        underlayColor="#F5F6F7"
        isRejected={franchiseeStatus === 'REJECTED'}>
        <StyledText
          size="18px"
          lineHeight={26}
          weight="500"
          color={franchiseeStatus === 'REJECTED' ? '#FF5239' : 'black'}>
          {franchiseeStatus === 'REJECTED'
            ? '가맹점 신청 거절'
            : '가맹점 신청하기'}
        </StyledText>
      </StyledButton>
    </Container>
  );
}
const Container = styled.View`
  margin: 28px 0 28px;
  padding: 0 20px;
`;

const StyledButton = styled.TouchableHighlight<{ isRejected: boolean }>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 13px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${props => (props.isRejected ? '#FF5239' : '#cbccce')};
`;

const SlashButtonWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SlashButtonImage = styled.Image`
  height: 52px;
  width: 100%;
`;

const AbsoluteText = styled(StyledText)`
  position: absolute;
`;
export default FranchiseeStatusBtn;
