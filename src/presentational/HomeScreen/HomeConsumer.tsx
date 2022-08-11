import React from 'react';
import styled from 'styled-components/native';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

import imgBanner from '@/assets/images/presentation_1.png';
import imgOngOne from '@/assets/images/ong_1.png';
import imgOngTwo from '@/assets/images/ong_2.png';

import Header from '@/components/Header';
import CardOng from '@/components/CardOng';

interface TextProps {
  title?: boolean;
}

interface DataOng {
  image: string;
  title: string;
  link: string;
}

const dataOngServices: DataOng[] = [
  {
    image: imgOngOne,
    title: i18next.t('CardOng.One'),
    link: 'https://cestou.netlify.app/sobre',
  },
  {
    image: imgOngTwo,
    title: i18next.t('CardOng.Two'),
    link: 'https://cestou.netlify.app/sobre',
  },
];

export const HomeConsumer = () => {
  const {t} = useTranslation();

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header />
      <StyledBanner source={imgBanner}>
        <StyledTitleBanner>
          {t('Text.ScreenHomeConsumer.TitleBanner')}
        </StyledTitleBanner>
        <StyledSubtitleBanner>
          {t('Text.ScreenHomeConsumer.SubTitleBanner')}
        </StyledSubtitleBanner>
      </StyledBanner>
      <StyledContent>
        <StyledText title>{t('Text.ScreenHomeConsumer.Title')}</StyledText>
        <StyledText>{t('Text.ScreenHomeConsumer.SubTitle')}</StyledText>

        <StyledContainerServices>
          {dataOngServices.map((ong: DataOng, index: number) => (
            <CardOng
              key={index}
              title={ong.title}
              image={ong.image}
              link={ong.link}
            />
          ))}
        </StyledContainerServices>
      </StyledContent>
    </StyledContainerScroll>
  );
};

const StyledContainerScroll = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledContent = styled.View`
  width: 90%;
  align-self: center;
  padding: 24px 0;
`;

const StyledBanner = styled.ImageBackground`
  width: 100%;
  height: 198px;
  align-items: flex-end;

  padding: 16px;
`;

const StyledTitleBanner = styled.Text`
  font-style: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGEST};
  color: ${({theme}) => theme.colors.PRIMARY_800};

  text-align: right;
  margin-bottom: 16px;
`;

const StyledSubtitleBanner = styled(StyledTitleBanner)`
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  line-height: 22px;
`;

const StyledText = styled.Text<TextProps>`
  font-family: ${({theme, title}) =>
    title
      ? theme.fonts.SEMIBOLD_SOURCESANSPRO
      : theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme, title}) =>
    title ? theme.sizing.SMALL : theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-bottom: 16px;
`;

const StyledContainerServices = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
