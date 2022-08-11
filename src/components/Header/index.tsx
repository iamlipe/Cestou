import React, {memo} from 'react';
import styled, {css, useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const typeHeader = {
  normal: css`
    height: 64px;
  `,
  profile: css`
    height: 162px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
  `,
};

interface ContainerProps {
  type: keyof typeof typeHeader;
}

interface Props {
  welcome?: boolean;
  type?: keyof typeof typeHeader;
  title?: string;
  photo?: string;
}

const Header = ({welcome = true, type = 'normal', photo, title}: Props) => {
  const {auth} = useReduxSelector(state => state.user);
  const {goBack} = useNavigation();
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledContainerInfo type={type}>
        <StyledContent>
          {welcome ? (
            <StyledTitle>
              {t('Text.ComponentHeader.Welcome', {name: auth?.firstName})}
            </StyledTitle>
          ) : (
            <>
              <StyledRow>
                <StyledBaseButton activeOpacity={1} onPress={() => goBack()}>
                  <Icon
                    name="arrow-back"
                    size={24}
                    color={theme.colors.GRAY_900}
                  />
                </StyledBaseButton>

                <StyledTitle>{title}</StyledTitle>
              </StyledRow>

              {type === 'profile' && (
                <StyledBaseButton onPress={() => null}>
                  <Icon
                    testID="icon-settings"
                    name="settings"
                    size={24}
                    color={theme.colors.GRAY_900}
                    style={{alignSelf: 'flex-end'}}
                  />
                </StyledBaseButton>
              )}
            </>
          )}
        </StyledContent>
      </StyledContainerInfo>

      {type === 'profile' && auth?.firstName && (
        <>
          <StyledContainerPhoto>
            <StyledChangePhotoButton>
              <Icon name="mode-edit" size={20} color={theme.colors.GRAY_900} />
            </StyledChangePhotoButton>
            {photo ? (
              <StyledPhoto testID="user-photo" source={{uri: photo}} />
            ) : (
              <StyledFirstLetter testID="user-photo">
                {auth?.firstName[0].toUpperCase()}
              </StyledFirstLetter>
            )}
          </StyledContainerPhoto>
          <StyledName>{auth?.firstName}</StyledName>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View``;

const StyledContainerInfo = styled.View<ContainerProps>`
  ${({type}) =>
    css`
      ${typeHeader[type]}
    `}

  width: 100%;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.PRIMARY_300};
  padding: 0 5%;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGEST};
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-left: 10px;
`;

const StyledBaseButton = styled.TouchableOpacity``;

const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledContent = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledContainerPhoto = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.SECUNDARY_500};
  margin-top: -50px;
`;

const StyledChangePhotoButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.SECUNDARY_300};
`;

const StyledFirstLetter = styled.Text`
  position: absolute;
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: 48px;
  color: ${({theme}) => theme.colors.GRAY_900};
  line-height: 100px;
`;

const StyledPhoto = styled.Image`
  position: absolute;
  z-index: -1;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const StyledName = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGEST};
  color: ${({theme}) => theme.colors.GRAY_900};

  text-align: center;
  margin-top: 10px;
`;

export default memo(Header);
