import React, {memo, useState, useCallback} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInputProps} from 'react-native';
import {useController} from 'react-hook-form';
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props extends TextInputProps {
  name: string;
  control: any;
  label?: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  error?: string;
  secureTextEntry?: boolean;
}

const InputForm = ({
  name,
  control,
  label,
  type,
  options,
  error,
  secureTextEntry = false,
}: Props) => {
  const [securityText, setSecurityText] = useState(secureTextEntry);
  const placeholderTraslateX = useSharedValue(0);
  const placeholderFontSize = useSharedValue(14);
  const placeholderOpacity = useSharedValue(1);
  const theme = useTheme();

  const {
    field: {onChange, value},
  } = useController({name, control});

  const handleFocus = useCallback(
    (editing: boolean) => {
      if (editing) {
        placeholderTraslateX.value = withTiming(-12, {duration: 100});
        placeholderFontSize.value = withTiming(12, {duration: 100});
        placeholderOpacity.value = withTiming(0.6, {duration: 100});
      } else {
        placeholderTraslateX.value = withTiming(0, {duration: 100});
        placeholderFontSize.value = withTiming(14, {duration: 100});
        placeholderOpacity.value = withTiming(1, {duration: 100});
      }
    },
    [placeholderFontSize, placeholderOpacity, placeholderTraslateX],
  );

  const animatedStylePlaceholder = useAnimatedStyle(() => {
    return {
      transform: [{translateY: placeholderTraslateX.value}],
      fontSize: placeholderFontSize.value,
      opacity: placeholderOpacity.value,
    };
  });

  return (
    <StyledContainer>
      <StyledContainerInput>
        <StyledLabel style={animatedStylePlaceholder}>{label}</StyledLabel>
        {type ? (
          <StyledInputMask
            testID={`input-text-${name}`}
            type={type}
            options={options}
            onChangeText={onChange}
            onFocus={() => handleFocus(true)}
            onBlur={() => {
              if (value === '') handleFocus(false);
            }}
            value={value}
          />
        ) : (
          <StyledInput
            testID={`input-text-${name}`}
            onChangeText={onChange}
            onFocus={() => handleFocus(true)}
            onBlur={() => {
              if (value === '') handleFocus(false);
            }}
            value={value}
            secureTextEntry={securityText}
          />
        )}

        {secureTextEntry && (
          <Icon.Button
            testID={securityText ? 'visibility-icon' : 'visibility-off-icon'}
            name={securityText ? 'visibility' : 'visibility-off'}
            iconStyle={{marginRight: 0}}
            size={20}
            color={theme.colors.GRAY_900}
            backgroundColor={theme.colors.SUCCESS_100}
            onPress={() => setSecurityText(!securityText)}
          />
        )}
        {error && (
          <Icon
            testID="error-icon"
            name="warning"
            size={24}
            color={theme.colors.ERROR_800}
          />
        )}
      </StyledContainerInput>
      <StyledError>{error}</StyledError>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  margin-bottom: 10px;
`;

const StyledContainerInput = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  background-color: ${({theme}) => theme.colors.SUCCESS_100};
  border-color: ${({theme}) => theme.colors.GRAY_700};
  padding: 0 16px;
`;

const StyledLabel = styled(Animated.Text)`
  position: absolute;
  padding-left: 16px;
  color: ${({theme}) => theme.colors.GRAY_900};
`;

const StyledError = styled.Text`
  align-self: flex-end;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.ERROR_800};
  margin-bottom: 3px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: ${({theme}) => theme.sizing.SMALLER};
  margin-top: 15px;
`;

const StyledInputMask = styled(TextInputMask)`
  flex: 1;
  font-size: ${({theme}) => theme.sizing.SMALLER};
  margin-top: 15px;
`;

export default memo(InputForm);
