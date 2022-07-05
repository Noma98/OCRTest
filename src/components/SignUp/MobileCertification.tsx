import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import phone from '@/assets/icons/Auth/phone.png';
import slashButton from '@/assets/icons/Etc/slashButton.png';
import { StyledText } from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';

const Container = styled.View`
  padding: 0 20px;
`;

const StyledButton = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 13px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: #cbccce;
`;

const FlexWrapper = styled.View`
  flex-direction: row;
`;

const ButtonImage = styled.Image`
  width: 16px;
  height: 24px;
  margin-right: 4px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Dot = styled.Text`
  font-size: 18px;
  margin: 6px 0 30px;
`;

const Notification = styled.Text`
  font-size: 14px;
  line-height: 18px;
  margin: 12px 0 28px;
  margin-left: 8px;
  margin-right: 10px;
`;

const SlashButtonWrapper = styled.View`
  position: relative;
`;

const SlashButtonImage = styled.Image`
  height: 52px;
  width: 100%;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 52px;
  align-items: center;
  position: absolute;
  width: 100%;
`;

function MobileCertification() {
  const { storeTel, sellerName } = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const isCertification = useMemo(
    () => Boolean(storeTel) && Boolean(sellerName),
    [storeTel, sellerName],
  );

  const onPress = () => {
    navigation.navigate('Vertification', { headerTitle: '회원가입' });
  };

  return (
    ////QA 목적 => 완료되면 수정 필요 (true를 isCertification으로)
    <Container>
      {isCertification ? (
        <SlashButtonWrapper>
          <SlashButtonImage resizeMode="stretch" source={slashButton} />
          <TextWrapper>
            <ButtonImage source={phone} />
            <StyledText size="18px" lineHeight={26} weight="500">
              휴대폰 본인인증 완료
            </StyledText>
          </TextWrapper>
        </SlashButtonWrapper>
      ) : (
        <StyledButton onPress={onPress} underlayColor="#F5F6F7">
          <FlexWrapper>
            <ButtonImage source={phone} />
            <StyledText size="18px" lineHeight={26} weight="500">
              휴대폰 본인인증
            </StyledText>
          </FlexWrapper>
        </StyledButton>
      )}
      <Wrapper>
        <Dot>•</Dot>
        <Notification>
          상품 구매 또는 결제수단 이용 시 제 3자 무단 사용을 방지하기 위해
          본인인증이 필요합니다.
        </Notification>
      </Wrapper>
    </Container>
  );
}

export default MobileCertification;
