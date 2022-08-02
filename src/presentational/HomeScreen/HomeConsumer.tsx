import React from 'react';
import styled from 'styled-components/native';

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
    title: 'ONG Comida na mesa',
    link: 'https://cestou.netlify.app/sobre',
  },
  {
    image: imgOngTwo,
    title: 'ONG Criança sem fome',
    link: 'https://cestou.netlify.app/sobre',
  },
];

export const HomeConsumer = () => {
  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header />
      <StyledBanner source={imgBanner}>
        <StyledTitleBanner>Faça sua{'\n'} assinatura!</StyledTitleBanner>
        <StyledSubtitleBanner>
          Produtos fresquinhos de{'\n'} produtores locais toda{'\n'} semana na
          sua mesa
        </StyledSubtitleBanner>
      </StyledBanner>
      <StyledContent>
        <StyledText title>Ajude no combate a fome</StyledText>
        <StyledText>
          Veja abaixo as instituições e projetos cadastrados na nossa rede e
          ajude-nos a atingir a meta do mês doando suas moedas que serão
          convertidas em alimentos.
        </StyledText>

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
