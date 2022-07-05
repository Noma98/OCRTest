import React from 'react';
import { View } from 'react-native';
import { animated, useSpring } from 'react-spring';
import styled, { css } from 'styled-components/native';

interface IStyleProps {
  isOpacity: boolean;
  isDark: boolean;
}

const Container = styled.View<IStyleProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${props =>
    props.isOpacity &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${props.isDark ? 'rgba(0, 0, 0, 0.4)' : '#fff'};
    `}
`;

const AnimatedView = animated(View);

const animationData = [
  {
    delay: 0,
    duration: 500,
  },
  {
    delay: 100,
    duration: 400,
  },
  {
    delay: 200,
    duration: 300,
  },
];

interface IDotProps {
  delay: number;
  duration: number;
  isDark: boolean;
}

function DotItem({ delay, duration, isDark }: IDotProps) {
  const { value } = useSpring({
    loop: { reverse: true },
    from: { value: 0 },
    config: {
      duration,
    },
    to: { value: 12 },
    delay,
  });

  return (
    <AnimatedView
      style={{
        backgroundColor: isDark ? '#fff' : '#005F83',
        width: 11,
        height: 11,
        borderRadius: 50,
        marginRight: delay === 200 ? 0 : 5,
        marginLeft: delay === 0 ? 5 : 0,
        marginBottom: value,
      }}
    />
  );
}

interface IProps {
  isOpacity?: boolean;
  isDark?: boolean;
}

function LoadingView({ isOpacity = false, isDark = false }: IProps) {
  return (
    <Container isOpacity={isOpacity} isDark={isDark}>
      {animationData.map(data => (
        <DotItem key={data.delay} {...data} isDark={isDark} />
      ))}
    </Container>
  );
}

export default LoadingView;
