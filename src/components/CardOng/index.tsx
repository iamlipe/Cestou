import React, {memo} from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';

interface Props {
  title: string;
  image: string;
  link?: string;
  onPress?: () => void;
}

const CardOng = ({title, image, link, onPress}: Props) => {
  return (
    <StyledContainer
      onPress={async () => {
        if (link) Linking.openURL(link);
        if (onPress) onPress();
      }}>
      <StyledImage testID="card-ong-image" source={image} />
      <StyledTitle>{title}</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  width: 48%;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 130px;
  border-radius: 4px;

  margin-bottom: 5px;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

export default memo(CardOng);
