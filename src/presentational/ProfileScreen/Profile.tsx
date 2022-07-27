import React from 'react';
import styled from 'styled-components/native';
import {LOGOUT} from '@/store/slices/userSlice';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';

export const Profile = () => {
  const dispatch = useReduxDispatch();

  return (
    <StyledContainer>
      <StyledButton title="Sair" onPress={() => dispatch(LOGOUT())} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View``;
const StyledButton = styled.Button``;
