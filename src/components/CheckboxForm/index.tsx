import React, { memo, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useController } from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  options: string[];
}

const CheckBox = ({ name, control, options }: Props) => {
  const [checkeds, setCheckeds] = useState<string[]>([]);
  const theme = useTheme();

  const {
    field: { onChange },
  } = useController({ name, control });

  const renderOptions = (option: string, index: number) => (
    <StyledContainerChecked
      key={index}
      onPress={() => {
        if (checkeds.includes(option)) {
          const newCheckeds = checkeds.filter(item => item !== option);

          setCheckeds(newCheckeds);
          onChange(newCheckeds);
        } else {
          const newCheckeds = checkeds.concat(option);

          setCheckeds(newCheckeds);
          onChange(newCheckeds);
        }
      }}
    >
      <Icon
        name={
          checkeds.includes(option) ? 'check-box' : 'check-box-outline-blank'
        }
        testID={
          checkeds.includes(option)
            ? `checkbox-icon-checked-${index}`
            : `checkbox-icon-not-checked-${index}`
        }
        color={theme.colors.PRIMARY_800}
        size={24}
      />
      <StyledText>{option}</StyledText>
    </StyledContainerChecked>
  );

  return (
    <>
      {options.map((option, index) => {
        return renderOptions(option, index);
      })}
    </>
  );
};

const StyledContainerChecked = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({ theme }) => theme.sizing.SMALLER};
  color: ${({ theme }) => theme.colors.GRAY_900};
  margin-left: 5px;
`;

export default memo(CheckBox);
