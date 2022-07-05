import { AxiosError } from 'axios';
import React, { useLayoutEffect, useReducer, useState } from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import { deleteEmployee, getEmployeeList } from '@/api/user';
import BackButton from '@/components/common/BackButton';
import BodyWrap from '@/components/common/BodyWrap';
import Button from '@/components/common/Button';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import DividingLine from '@/components/common/DividingLine';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import ListItem from '@/components/EmployeeAccount/ListItem';
import Confirm from '@/components/Modal/Confirm';
import ButtonGroup from '@/components/ScanMode/RefundResult/ButtonGroup';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IEmployeeAccountResponse } from '@/types/api/user';
import { IError } from '@/types/common/index';
import { EmployeeAccountScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { isAndroid } from '@/utils/check';
import { close } from '@/utils/getImages';

export type checkAction =
  | { type: 'SELECT'; payload: number }
  | { type: 'UNSELECT'; payload: number }
  | { type: 'RESET' };

function checkReducer(state = [], action: checkAction) {
  switch (action.type) {
    case 'SELECT':
      return [...state, action.payload];
    case 'UNSELECT':
      return state.filter(item => item !== action.payload);
    case 'RESET':
      return [];
    default:
      throw new Error(`Unhandled Action Type Error: ${action}`);
  }
}

interface IProps {
  navigation: EmployeeAccountScreenProps['navigation'];
}
function EmployeeAccount({ navigation }: IProps) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );
  const [checkArray, dispatch] = useReducer(checkReducer, []);
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    if (isDeleteMode) {
      navigation.setOptions({
        headerTitle: '직원 삭제하기',
        headerLeft: () => (
          <ButtonWithIcon
            iconSource={close}
            iconSize="25px"
            margin={`0 0 0 ${isAndroid() ? '30px' : '20px'}`}
            onPress={() => {
              dispatch({ type: 'RESET' });
              setIsDeleteMode(false);
            }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerTitle: '직원 계정 생성',
        headerLeft: () => <BackButton />,
      });
    }
  }, [isDeleteMode, navigation]);

  const mutation = useMutation<number, AxiosError<IError>>(
    () => deleteEmployee({ employeeIndexList: checkArray }),
    {
      retry: false,
      onSuccess: () => {
        queryClient.refetchQueries('EmployeeList');
        dispatch({ type: 'RESET' });
      },
    },
  );

  const { data, isLoading } = useQuery<
    IEmployeeAccountResponse,
    AxiosError<IError>
  >(['EmployeeList'], () => getEmployeeList({ franchiseeIndex }), {
    retry: false,
  });
  if (isLoading) {
    return <LoadingView />;
  }

  const onDelete = () => {
    setIsDeleteMode(false);
    setModalVisible(false);
    mutation.mutate();
  };

  return (
    <>
      <BodyWrap isPadding={false}>
        <DividingLine text="직원 목록" />
        <FlexWrap>
          {data?.length !== 0 ? (
            data?.map(item => (
              <ListItem
                key={item.employeeIndex}
                data={item}
                isDeleteMode={isDeleteMode}
                dispatch={dispatch}
                checkArray={checkArray}
                navigation={navigation}
              />
            ))
          ) : (
            <Text text="등록된 직원이 없습니다." size="15px" margin={[20, 0]} />
          )}
        </FlexWrap>
      </BodyWrap>
      {isDeleteMode ? (
        <Button
          margin={isIphoneX() ? '30px 20px' : '20px'}
          title="선택 완료"
          active={checkArray.length !== 0}
          onPress={() => setModalVisible(true)}
        />
      ) : (
        <ButtonGroup
          textLeft="직원 삭제하기"
          textRight="직원 추가하기"
          onPressRight={() => navigation.navigate('AddEmployee')}
          onPressLeft={() => setIsDeleteMode(true)}
          isLeftActive={data?.length !== 0}
        />
      )}
      <Confirm
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onConfirm={onDelete}
        message={`선택한 직원의 계정을 삭제하시겠습니까?\n직원 계정을 삭제하려면\n'확인'을 눌러주세요.`}
      />
    </>
  );
}
const FlexWrap = styled.View`
  padding: 0 20px;
`;
export default EmployeeAccount;
