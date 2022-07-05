import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, TextStyle, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import ArrowIcon from '@/assets/icons/Auth/arrow.png';
import { isAndroid } from '@/utils/check';
import { getScreenSize } from '@/utils/common';
import { Picker } from '@react-native-picker/picker';

const { width: screenWidth } = getScreenSize();

const LabelWrapper = styled.View`
  flex-direction: row;
`;

const RequiredDot = styled.Text`
  color: #ff5239;
  margin-left: 2px;
`;

const Label = styled.Text`
  color: gray;
  font-size: 16px;
  font-weight: 400;
  color: black;
  margin: 0 0 12px;
`;

const CategoryModalButton = styled.TouchableOpacity`
  padding: 12px 14px;
  border-width: 1px;
  border-color: #cbccce;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowDownIcon = styled.Image`
  width: 24px;
  height: 24px;
  transform: rotate(90deg);
`;

const ButtonText = styled.Text<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? '#000' : '#9fa1a7')};
  font-size: 14px;
  line-height: 22px;
`;

const ModalCloseBtnWrapper = styled.View`
  position: absolute;
  bottom: 196px;
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
  border-radius: 4px;
  border-width: 1px;
  border-color: #cbccce;
`;

interface IProps<ItemType> {
  category: ItemType;
  onCategoryChange: (value: ItemType) => void;
  isSelected: boolean;
  itemList: string[];
  label: string;
  isRequired?: boolean;
  hideiOSModal?: boolean;
}

function SelectCategory<ItemType>({
  category,
  onCategoryChange,
  isSelected,
  itemList,
  label,
  isRequired = false,
  hideiOSModal,
}: IProps<ItemType>) {
  const pickerRef = useRef<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    hideiOSModal && setIsModalVisible(false);
  }, [hideiOSModal]);

  const toggleModal = useCallback(() => {
    Keyboard.dismiss();
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
        bottom: -20,
        left: 0,
        width: screenWidth,
        height: 216,
        backgroundColor: '#D5D8DD',
        marginLeft: -20,
      };

  return (
    <>
      <LabelWrapper>
        <Label>{label}</Label>
        {isRequired && <RequiredDot>*</RequiredDot>}
      </LabelWrapper>
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
          <CategoryModalButton onPress={toggleModal}>
            <ButtonText isSelected={isSelected}>{category}</ButtonText>
            <ArrowDownIcon source={ArrowIcon} />
          </CategoryModalButton>
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

export default SelectCategory;
