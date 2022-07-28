import React, {memo} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useNavigation} from '@react-navigation/native';

interface Props {
  welcome?: boolean;
  title?: string;
}

const Header = ({welcome = true, title}: Props) => {
  const user = useReduxSelector(state => state.user.auth);
  const theme = useTheme();
  const {goBack} = useNavigation();

  return (
    <StyledContainer>
      {welcome ? (
        <StyledTitle>{`Olá ${user?.firstName}!`}</StyledTitle>
      ) : (
        <>
          <Icon.Button
            name="arrow-back"
            size={24}
            color={theme.colors.GRAY_900}
            backgroundColor={theme.colors.PRIMARY_300}
            style={{padding: 0}}
            activeOpacity={1}
            onPress={() => goBack()}
          />
          <StyledTitle>{title}</StyledTitle>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.PRIMARY_300};
  padding: 0 5%;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGEST};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

export default memo(Header);
