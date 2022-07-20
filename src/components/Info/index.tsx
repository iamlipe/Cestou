import React, {memo} from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';
import {OUR_SITE} from 'react-native-dotenv';

import Button from '@/components/Button';

const Info = () => {
  return (
    <StyledContainerInfo>
      <StyledText>
        Se você é uma instituição que atua no combate a fome e deseja solicitar
        seu cadastro, visite nosso site e saiba mais.
      </StyledText>
      <Button
        onPress={async () => Linking.openURL(OUR_SITE)}
        size="medium"
        buttonColor="text_only"
        textColor="primary"
        title="Ir para o site"
        noMargin
      />
    </StyledContainerInfo>
  );
};

const StyledContainerInfo = styled.View`
  width: 90%;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_800};
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 50px;
`;

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-bottom: 16px;
`;

export default memo(Info);
