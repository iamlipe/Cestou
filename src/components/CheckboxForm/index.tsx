import React, {memo, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useController} from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  options: string[];
  detailsOptions?: string[];
  error?: string;
}

interface ContainerCheckedProps {
  withDetails?: boolean;
}

interface OptionTextProps {
  withDetails?: boolean;
}

const CheckBox = ({name, control, options, detailsOptions, error}: Props) => {
  const [checkeds, setCheckeds] = useState<string[]>([]);
  const theme = useTheme();

  const {
    field: {onChange},
  } = useController({name, control});

  const renderOptions = (option: string, index: number) => (
    <StyledContainerChecked
      key={index}
      withDetails={!!detailsOptions}
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
      }}>
      <Icon
        name={
          checkeds.includes(option) ? 'check-box' : 'check-box-outline-blank'
        }
        testID={
          checkeds.includes(option)
            ? `checkbox-icon-checked-${index}`
            : `checkbox-icon-not-checked-${index}`
        }
        color={
          checkeds.includes(option)
            ? theme.colors.PRIMARY_800
            : theme.colors.GRAY_700
        }
        size={24}
      />
      <StyledColumn>
        <StyledOptionText withDetails={!!detailsOptions}>
          {option}
        </StyledOptionText>
        {detailsOptions && (
          <StyledDetailsText>{detailsOptions[index]}</StyledDetailsText>
        )}
      </StyledColumn>
    </StyledContainerChecked>
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

const StyledContainerChecked = styled.TouchableOpacity<ContainerCheckedProps>`
  width: ${({withDetails}) => (withDetails ? '100%' : 'auto')};
  height: ${({withDetails}) => (withDetails ? '80px' : 'auto')};
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  border: ${({withDetails, theme}) =>
    withDetails ? `1px solid ${theme.colors.PRIMARY_600}` : 'none'};
  border-radius: 4px;
  padding: ${({withDetails}) => (withDetails ? '0 8px 0 16px' : '0')};
`;

const StyledOptionText = styled.Text<OptionTextProps>`
  font-family: ${({withDetails, theme}) =>
    withDetails
      ? theme.fonts.SEMIBOLD_SOURCESANSPRO
      : theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({withDetails, theme}) =>
    withDetails ? theme.sizing.SMALLER : theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-left: 5px;
  margin-bottom: ${({withDetails}) => (withDetails ? '5px' : '0')};
`;

const StyledDetailsText = styled(StyledOptionText)`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
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
  margin-bottom: 3px;
`;

export default memo(CheckBox);
