import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import arrowBottom from '@/assets/icons/Etc/arrowBottom.png';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

interface IProps {
  title: string;
  body: string;
  activeCategory: string;
}
function ToggleItem({ title, body, activeCategory }: IProps) {
  const [active, setActive] = useState(false);
  const onPress = () => {
    setActive(state => {
      return !state;
    });
  };

  useEffect(() => {
    active && setActive(false);
  }, [activeCategory]);

  return (
    <>
      <TitleContainer activeOpacity={1} onPress={onPress}>
        <TitleWrap>
          <Text
            text={title}
            style={{ flex: 1 }}
            color={active ? '#005F83' : 'black'}
          />
          <ArrowIcon source={arrowBottom} active={active} />
        </TitleWrap>
      </TitleContainer>
      <BodyContainer active={active}>
        <Text text={body} />
      </BodyContainer>
    </>
  );
}
const BodyContainer = styled.View<{ active: boolean }>`
  display: ${props => (props.active ? 'flex' : 'none')};
  background-color: #f4f9fb;
  padding: 20px;
`;
const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0 20px;
  height: 88px;
  align-items: center;
  border-bottom-width: 1;
  border-bottom-color: #e5e6e8;
`;
const TitleWrap = styled(FlexWrap)`
  align-items: flex-start;
`;
const ArrowIcon = styled.Image<{ active: boolean }>`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  transform: ${props => props.active && 'rotate(180deg)'};
`;
export default ToggleItem;
