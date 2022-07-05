import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import ToggleItem from '@/components/CustomerService/ToggleItem';
import faqArr from '@/constants/faq';

interface IMenuItemProps {
  active: string;
  value: string;
  setActive?: Dispatch<SetStateAction<string>>;
}
function MenuItem({ active, value, setActive }: IMenuItemProps) {
  return (
    <Item
      underlayColor={setActive ? '#F5F6F7' : 'white'}
      active={active === value}
      onPress={() => setActive && setActive(value)}>
      <ItemTitle active={active === value}>{value}</ItemTitle>
    </Item>
  );
}
const Item = styled.TouchableHighlight<{ active: boolean }>`
  height: 46px;
  justify-content: center;
  align-items: center;
  flex: 1;
  border: 1px solid #e5e6e8;
  border-bottom-width: 0px;
  border-left-width: 0px;
  background-color: ${props => (props.active ? '#F4F9FB' : 'white')};
`;
const ItemTitle = styled.Text<{ active: boolean }>`
  font-size: 15px;
  color: ${props => (props.active ? '#005F83' : 'black')};
  font-weight: ${props => (props.active ? '500' : '400')};
`;

const menuArr = [
  ['전체', '가맹신청', '환급', 'T.POINT'],
  ['사후면세', '부가가치세', '기타'],
];

function FAQ() {
  const [active, setActive] = useState('전체');
  return (
    <Container>
      <Text
        text="FAQ"
        size="22px"
        lineHeight={30}
        weight="500"
        margin={[20, 20, 0]}
      />
      <MenuTable>
        <Row>
          {menuArr[0].map(item => (
            <MenuItem active={active} setActive={setActive} value={item} />
          ))}
        </Row>
        <Row>
          {menuArr[1].map(item => (
            <MenuItem active={active} setActive={setActive} value={item} />
          ))}
          <MenuItem active={active} value="" />
        </Row>
      </MenuTable>
      {faqArr
        .filter(item => {
          if (active === '전체') {
            return true;
          } else {
            return item.catetory === active;
          }
        })
        .map(({ title, body }, idx) => (
          <ToggleItem
            key={idx}
            title={title}
            body={body}
            activeCategory={active}
          />
        ))}
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 60px;
`;
const Row = styled(FlexWrap)`
  width: 101%;
`;
const MenuTable = styled.View`
  align-items: center;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
  margin: 20px 20px 18px;
`;
export default FAQ;
