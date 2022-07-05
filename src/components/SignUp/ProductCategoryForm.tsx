import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import styled from 'styled-components/native';

import { Input } from '@/components/common/Input';
import SelectCategory from '@/components/common/SelectCategory';
import { productCategoryList } from '@/constants/signUp';
import { CategoryType } from '@/types/user';
import { isAndroid } from '@/utils/check';

const Container = styled.View`
  margin: 0 0 20px;
`;

const CategoryWrapper = styled.View`
  margin: 0 0 8px;
`;

interface IProps {
  productCategory: CategoryType;
  onChange: (
    name: 'productCategory' | 'etc',
    value: CategoryType | string,
  ) => void;
  etc: string;
}

function ProductCategoryForm(props: IProps) {
  const { productCategory, onChange, etc } = props;

  const onCategoryChange = (value: CategoryType) => {
    onChange('productCategory', value);
    onChange('etc', '');
  };

  const onEtcChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    onChange('etc', value);
  };

  return (
    <Container>
      <CategoryWrapper>
        <SelectCategory<CategoryType>
          label="판매상품 종목"
          isRequired
          itemList={productCategoryList}
          category={productCategory}
          onCategoryChange={onCategoryChange}
          isSelected={productCategory !== '판매상품 종목 선택'}
          {...(productCategory === '기타' && { hideiOSModal: true })}
        />
      </CategoryWrapper>
      {productCategory === '기타' && (
        <Input
          value={etc}
          defaultValue=""
          onChange={onEtcChange}
          placeholder="직접 입력"
          autoFocus={isAndroid()}
        />
      )}
    </Container>
  );
}

export default ProductCategoryForm;
