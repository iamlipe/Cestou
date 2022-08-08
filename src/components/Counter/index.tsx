import React, {memo, useEffect, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {useController} from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  maxQuantity?: number;
}

const Counter = ({maxQuantity, name, control}: Props) => {
  const [counter, setCounter] = useState(maxQuantity || 0);
  const theme = useTheme();

  const {
    field: {onChange},
  } = useController({name, control, defaultValue: counter});

  useEffect(() => {
    if (maxQuantity) {
      onChange(maxQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <StyledButton>
        <Icon
          testID="decrement-button"
          name="minus"
          color={theme.colors.GRAY_900}
          size={14}
          onPress={() => {
            const newCounter = counter - 1 < 0 ? 0 : counter - 1;

            setCounter(newCounter);
            onChange(newCounter);
          }}
        />
      </StyledButton>
      <StyledInputCounter
        testID={`counter-${name}`}
        value={String(counter)}
        editable={false}
      />
      <StyledButton>
        <Icon
          testID="increment-button"
          name="plus"
          color={theme.colors.GRAY_900}
          size={14}
          onPress={() => {
            if (maxQuantity) {
              const newCounter =
                counter + 1 > maxQuantity ? maxQuantity : counter + 1;

              setCounter(newCounter);
              onChange(newCounter);
            } else {
              const newCounter = counter + 1;

              setCounter(newCounter);
              onChange(newCounter);
            }
          }}
        />
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  height: 32px;
  width: 86px;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.colors.PRIMARY_100};
  border-radius: 16px;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_500};
  padding: 0px 10px;
`;

const StyledInputCounter = styled.TextInput`
  width: 10px;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  padding: 0;
`;

const StyledButton = styled.TouchableOpacity``;

export default memo(Counter);
