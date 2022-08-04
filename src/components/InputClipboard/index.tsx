import React, {memo} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-community/clipboard';

interface Props {
  text: string;
}

const InputClipboard = ({text}: Props) => {
  const theme = useTheme();

  function copyToClipboard() {
    Clipboard.setString(text);
  }

  return (
    <StyledContainer>
      <StyledRow>
        <StyledText>{text}</StyledText>
        <StyledBaseButton onPress={copyToClipboard}>
          <Icon name="copy" size={20} color={theme.colors.GRAY_900} />
        </StyledBaseButton>
      </StyledRow>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  justify-content: center;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_800};
  border-radius: 5px;
  padding: 16px 16px;

  margin: 16px 0;
`;

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.Text``;

const StyledBaseButton = styled.TouchableOpacity``;

export default memo(InputClipboard);
