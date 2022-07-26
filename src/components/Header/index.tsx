import React, {memo} from 'react';
import styled from 'styled-components/native';
import {useReduxSelector} from '@/hooks/useReduxSelector';

interface Props {
  welcome?: boolean;
  title?: string;
}

const Header = ({welcome = true, title}: Props) => {
  const user = useReduxSelector(state => state.user.auth);

  return (
    <StyledContainer>
      {welcome ? (
        <StyledTitle>{`Olá ${user?.firstName}!`}</StyledTitle>
      ) : (
        <StyledTitle>{title}</StyledTitle>
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
