import React, {memo, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useController} from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  options: string[];
  withLine?: boolean;
  error?: string;
}

const RadioForm = ({
  name,
  control,
  options,
  withLine = false,
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
        <StyledTitle>{option}</StyledTitle>
      </StyledContainerRadio>
      {withLine && <StyledLine />}
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

const StyledContainerRadio = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-left: 5px;
`;

const StyledLine = styled.View`
  width: 100%;
  height: 1px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.GRAY_100};
  margin-bottom: 16px;
  margin-top: -4px;
`;

const StyledTextError = styled.Text`
  align-self: flex-end;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.ERROR_800};
  margin: -8px 0 16px 0;
`;

export default memo(RadioForm);
