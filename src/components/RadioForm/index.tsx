import React, {memo, useState} from 'react';
import styled, {css, useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useController} from 'react-hook-form';

const typeRadio = {
  normal: css``,
  withLine: css`
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.GRAY_100};
    padding: 12px 0 6px 0;
  `,
  withBox: css`
    max-height: 80px;
    border: 1px solid ${({theme}) => theme.colors.PRIMARY_800};
    border-radius: 4px;
    padding: 16px 12px;
  `,
};

interface ContainerProps {
  type: keyof typeof typeRadio;
}

interface TextProps {
  detailsOptions: boolean;
}

interface Props {
  name: string;
  control: any;
  options: string[];
  detailsOptions?: string[];
  error?: string;
  type?: keyof typeof typeRadio;
}

const RadioForm = ({
  name,
  control,
  options,
  type = 'normal',
  detailsOptions,
  error,
}: Props) => {
  const [checkeds, setCheckeds] = useState<string>('');
  const theme = useTheme();

  const {
    field: {onChange},
  } = useController({name, control});

  const renderOptions = (option: string, index: number) => (
    <StyledContainerOption key={index}>
      <StyledContainerRadio
        type={type}
        onPress={() => {
          setCheckeds(option);
          onChange(option);
        }}>
        <Icon
          name={
            checkeds.includes(option)
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
          }
          testID={
            checkeds.includes(option)
              ? `radio-icon-checked-${index}`
              : `radio-icon-not-checked-${index}`
          }
          color={
            checkeds.includes(option)
              ? theme.colors.PRIMARY_800
              : theme.colors.GRAY_700
          }
          size={24}
        />
        <StyledColumn>
          <StyledOptionText detailsOptions={!!detailsOptions}>
            {option}
          </StyledOptionText>
          {detailsOptions && (
            <StyledDetailsText>{detailsOptions[index]}</StyledDetailsText>
          )}
        </StyledColumn>
      </StyledContainerRadio>
    </StyledContainerOption>
  );

  return (
    <>
      {options.map((option, index) => {
        return renderOptions(option, index);
      })}
      <StyledTextError>{error}</StyledTextError>
    </>
  );
};

const StyledContainerOption = styled.View``;

const StyledContainerRadio = styled.TouchableOpacity<ContainerProps>`
  ${({type}) =>
    css`
      ${typeRadio[type]}
    `}

  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledOptionText = styled.Text<TextProps>`
  font-family: ${({detailsOptions, theme}) =>
    detailsOptions
      ? theme.fonts.SEMIBOLD_SOURCESANSPRO
      : theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({detailsOptions, theme}) =>
    detailsOptions ? theme.sizing.SMALLER : theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-left: 8px;
`;

const StyledDetailsText = styled(StyledOptionText)`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  margin-top: 8px;
`;

const StyledColumn = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const StyledTextError = styled.Text`
  align-self: flex-end;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.ERROR_800};
  margin: -8px 0 16px 0;
`;

export default memo(RadioForm);
