import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';
interface CautionProps {
  text: string;
}

function Caution({ text }: CautionProps) {
  return (
    <Container>
      <StyledView>
        <Text
          text={text}
          color="white"
          center
          style={{
            width: 180,
          }}
        />
      </StyledView>
      <Triangle />
    </Container>
  );
}
const Container = styled.View`
  margin: 0 0 10px;
`;

const StyledView = styled.View`
  border-radius: 4px;
  background-color: #005f83;
  width: 180px;
  padding: 6px 0;
`;

const Triangle = styled.View`
  width: 10px;
  border-top-width: 8px;
  border-left-width: 5px;
  border-right-width: 5px;
  border-bottom-width: 8px;
  border-top-color: #005f83;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: translate(10px, -0.5px);
`;
export default Caution;
