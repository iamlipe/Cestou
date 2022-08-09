import React, {memo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled, {css} from 'styled-components/native';

const buttonTextColor = {
  white: css`
    color: ${({theme}) => theme.colors.WHITE};
  `,
  black: css`
    color: ${({theme}) => theme.colors.GRAY_900};
  `,
  primary: css`
    color: ${({theme}) => theme.colors.PRIMARY_800};
  `,
};

const buttonSize = {
  small: css`
    width: 90px;
    height: 38px;
  `,
  medium: css`
    width: 140px;
    height: 38px;
  `,
  large: css`
    width: 200px;
    height: 49px;
  `,
};

const buttonBackgroundColor = {
  transparent: css`
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.colors.PRIMARY_800};
  `,
  text_only: css`
    background-color: transparent;
  `,
  primary: css`
    background-color: ${({theme}) => theme.colors.PRIMARY_800};
  `,
  disabled: css`
    background-color: ${({theme}) => theme.colors.GRAY_600};
  `,
};

interface ButtonProps {
  sizing: keyof typeof buttonSize;
  backgroundColor: keyof typeof buttonBackgroundColor;
  noMargin: boolean;
}

interface ButtonTextProps {
  textColor: keyof typeof buttonTextColor;
}

interface Props {
  onPress: () => void;
  title: string;
  constainerStyle?: StyleProp<ViewStyle>;
  textColor?: keyof typeof buttonTextColor;
  buttonColor?: keyof typeof buttonBackgroundColor;
  size?: keyof typeof buttonSize;
  noMargin?: boolean;
  loading?: boolean;
  testID?: string;
}

const ButtonForm = ({
  title,
  testID,
  textColor = 'white',
  buttonColor = 'primary',
  size = 'large',
  noMargin = false,
  loading = false,
  constainerStyle = {},
  ...rest
}: Props) => {
  return (
    <StyledContainerButton
      testID={testID}
      style={constainerStyle}
      backgroundColor={buttonColor}
      sizing={size}
      noMargin={noMargin}
      disabled={buttonColor === 'disabled'}
      {...rest}>
      {loading ? (
        <StyledLoading testID="loading" color="white" size="small" />
      ) : (
        <StyledTitleButton textColor={textColor}>{title}</StyledTitleButton>
      )}
    </StyledContainerButton>
  );
};

const StyledContainerButton = styled.TouchableOpacity<ButtonProps>`
  ${({backgroundColor, sizing}) => css`
    ${buttonSize[sizing]}
    ${buttonBackgroundColor[backgroundColor]}
  `}
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 4px;
  margin-bottom: ${({noMargin}) => (noMargin ? 0 : 10)}px;
`;

const StyledTitleButton = styled.Text<ButtonTextProps>`
  ${({textColor}) =>
    css`
      ${buttonTextColor[textColor]}
    `};
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
`;

const StyledLoading = styled.ActivityIndicator``;

export default memo(ButtonForm);
