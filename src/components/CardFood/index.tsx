import React, {memo} from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import {translateFoodToPortuguese} from '@/helpers/translate';

import Counter from '../Counter';

interface Props {
  name: string;
  control: any;
  maxQuantity: number;
  image: string;
}
const CardFood = ({name, image, control, maxQuantity}: Props) => {
  const {t, i18n} = useTranslation();

  return (
    <StyledContainer>
      <StyledImage source={{uri: image}} />

      <StyledContainerInfo>
        <StyledTitleCard>
          {i18n.language === 'pt' ? translateFoodToPortuguese(name) : name}
        </StyledTitleCard>
        <StyledButton>
          <StyledTextLink>{t('Text.ComponentCardFood.SeeMore')}</StyledTextLink>
        </StyledButton>
      </StyledContainerInfo>
      <Counter name={name} control={control} maxQuantity={maxQuantity} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  height: 72px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.GRAY_100};
  border-radius: 5px;
  margin-bottom: 16px;
`;

const StyledImage = styled.Image`
  height: 100%;
  width: 30%;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

const StyledContainerInfo = styled.View`
  width: 40%;
  height: 80%;
  flex-direction: column;
  justify-content: space-evenly;

  padding-left: 8px;
`;

const StyledTitleCard = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

export const StyledButton = styled.TouchableOpacity``;

export const StyledTextLink = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.PRIMARY_800};
  text-decoration: underline;
`;

export default memo(CardFood);
