import React, { MutableRefObject } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

interface BodyWrapProps {
  children: React.ReactNode;
  isPadding?: boolean;
  scrollRef?: MutableRefObject<undefined>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollStart?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

function BodyWrap({
  children,
  isPadding = true,
  onScroll,
  scrollRef,
  onScrollEnd,
  onScrollStart,
}: BodyWrapProps) {
  const viewStyles: ViewStyle = {
    flexGrow: 1,
  };

  return (
    <StyledSafeAreaView>
      <StyledScrollView
        ref={scrollRef}
        contentContainerStyle={viewStyles}
        showsVerticalScrollIndicator={false}
        isPadding={isPadding}
        onScroll={onScroll}
        onScrollEndDrag={onScrollEnd}
        onScrollBeginDrag={onScrollStart}
        scrollEventThrottle={100}>
        {children}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const StyledScrollView = styled.ScrollView<{ isPadding: boolean }>`
  padding: ${props => (props.isPadding ? '0px 20px' : '0')};
`;

export default BodyWrap;
