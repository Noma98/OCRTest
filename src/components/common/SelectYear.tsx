import React, { useCallback, useRef, useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import { isAndroid } from '@/utils/check';
import { getScreenSize } from '@/utils/common';
import { Picker } from '@react-native-picker/picker';

const { width: screenWidth } = getScreenSize();

const ModalCloseBtnWrapper = styled.View`
  position: absolute;
  bottom: 216px;
  left: 0;
  background-color: #f1f1f2;
  margin-left: -20px;
  width: ${screenWidth}px;
  height: 44px;
  justify-content: center;
  align-items: flex-end;
`;

const ModalCloseBtn = styled.TouchableOpacity``;

const ModalCloseBtnText = styled.Text`
  color: #3478f6;
  font-size: 16px;
  font-weight: 600;
  margin-right: 20px;
`;

const PickerWrapper = styled.View`
  border-width: 1px;
  border-color: #cbccce;
  padding: 0 0 0 8px;
  margin: 10px 0 30px;
`;

interface IProps<ItemType> {
  category: ItemType;
  onCategoryChange: (value: ItemType) => void;
  itemList: string[];
  label: string;
  isRequired?: boolean;
}

function SelectYear<ItemType>({
  category,
  onCategoryChange,
  itemList,
}: IProps<ItemType>) {
  const pickerRef = useRef<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalVisible(prevState => !prevState);
  }, []);

  const modalStyle: ViewStyle = {
    flex: 1,
    position: 'relative',
  };
  const pickerStyle: TextStyle = isAndroid()
    ? {}
    : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: screenWidth,
        height: 216,
        backgroundColor: '#D5D8DD',
        marginLeft: -20,
      };

  return (
    <>
      {isAndroid() ? (
        <PickerWrapper>
          <Picker
            onValueChange={onCategoryChange}
            selectedValue={category}
            style={pickerStyle}
            ref={pickerRef}>
            {itemList.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </PickerWrapper>
      ) : (
        <>
          <ButtonWithIcon
            onPress={toggleModal}
            borderColor="#CBCCCE"
            reverse
            margin="10px 0 30px"
            text={category}
            btnPadding="8px 14px 8px 8px"
            fontSize="15px"
            iconSize="24px"
            fontWeight="400"
            justifyContent="space-between"
            iconSource={require('/assets/icons/Etc/calendar.png')}
          />
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            backdropColor="transparent"
            style={modalStyle}>
            <ModalCloseBtnWrapper>
              <ModalCloseBtn onPress={toggleModal}>
                <ModalCloseBtnText>완료</ModalCloseBtnText>
              </ModalCloseBtn>
            </ModalCloseBtnWrapper>
            <Picker
              onValueChange={onCategoryChange}
              selectedValue={category}
              style={pickerStyle}>
              {itemList.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </Modal>
        </>
      )}
    </>
  );
}

export default SelectYear;
