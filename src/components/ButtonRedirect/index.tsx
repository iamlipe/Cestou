import React, {memo} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title: string;
  onPress: () => void;
}

const ButtonRedirect = ({title, onPress}: Props) => {
  const theme = useTheme();

  return (
    <StyledContainer onPress={onPress}>
      <StyledText>{title}</StyledText>
      <Icon
        name="keyboard-arrow-right"
        color={theme.colors.GRAY_900}
        size={24}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  width: 100%;
  height: 49px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.PRIMARY_100};
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_300};
  padding: 0 16px;
  margin-bottom: 16px;
`;

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

export default memo(ButtonRedirect);
