import React, {memo, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useController} from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  options: string[];
}

const CheckBox = ({name, control, options}: Props) => {
  const [checkeds, setCheckeds] = useState<string>('');
  const theme = useTheme();

  const {
    field: {onChange},
  } = useController({name, control});

  const renderOptions = (option: string, index: number) => (
    <StyledContainerRadio
      key={index}
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
  );

  return (
    <>
      {options.map((option, index) => {
        return renderOptions(option, index);
      })}
    </>
  );
};

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

export default memo(CheckBox);
