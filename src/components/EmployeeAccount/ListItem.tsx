import React, { Dispatch } from 'react';
import styled from 'styled-components/native';

import CheckBox from '@/assets/icons/Auth/terms.png';
import CheckBoxActive from '@/assets/icons/Auth/termsActive.png';
import Button from '@/components/common/Button';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { checkAction } from '@/screens/EmployeeAccount';
import { EmployeeAccountScreenProps } from '@/types/navigation';

interface Idata {
  employeeIndex: number;
  name: string;
  userId: string;
}
interface IProps {
  data: Idata;
  isDeleteMode: boolean;
  dispatch: Dispatch<checkAction>;
  navigation: EmployeeAccountScreenProps['navigation'];
  checkArray: number[];
}
function ListItem({
  data,
  isDeleteMode,
  dispatch,
  navigation,
  checkArray,
}: IProps) {
  const onPress = () => {
    dispatch({
      type: checkArray.includes(data.employeeIndex) ? 'UNSELECT' : 'SELECT',
      payload: data.employeeIndex,
    });
  };

  return (
    <ItemWrap>
      <Text text={data.name} />
      {isDeleteMode ? (
        <ButtonWithIcon
          onPress={onPress}
          iconSource={
            !checkArray.includes(data.employeeIndex) ? CheckBox : CheckBoxActive
          }
          iconSize="24px"
          btnPadding="2px"
        />
      ) : (
        <Button
          title="수정"
          active
          color="#005F83"
          padding="6px"
          backgroundColor="transparent"
          fontSize="16px"
          margin={[0]}
          style={{ height: 'auto' }}
          onPress={() => navigation.navigate('UpdateEmployee', { data })}
        />
      )}
    </ItemWrap>
  );
}
const ItemWrap = styled(FlexWrap)`
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
`;
export default ListItem;
