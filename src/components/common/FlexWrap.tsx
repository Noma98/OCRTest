import styled from 'styled-components/native';

const FlexWrap = styled.View<{ dir?: 'column' | 'row'; margin?: string }>`
  display: flex;
  flex-direction: ${props => (props.dir ? props.dir : 'row')};
`;

export default FlexWrap;
