import React, {useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Linking} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DonationConsumerStackParamList} from '@/routes/stacks/DonationConsumerStack';
import {OUR_SITE} from 'react-native-dotenv';

import imgOngOne from '@/assets/images/ong_1.png';
import imgOngTwo from '@/assets/images/ong_2.png';

import Header from '@/components/Header';
import CardOng from '@/components/CardOng';
import ModalDonation from '@/components/ModalDonation';
import Button from '@/components/Button';

interface DonationsOng {
  image: string;
  title: string;
}

interface DonationForm {
  coins: number;
}

type NavProps = NativeStackNavigationProp<
  DonationConsumerStackParamList,
  'ConfirmDonations'
>;

const schema = Yup.object().shape({
  coins: Yup.number()
    .min(1, 'Mínimo de 1 moeda')
    .required('Preenchimento obrigatório'),
});

const dataOngServices: DonationsOng[] = [
  {
    image: imgOngOne,
    title: 'ONG Comida na mesa',
  },
  {
    image: imgOngTwo,
    title: 'ONG Criança sem fome',
  },
];

export const HomeDonationConsumer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {navigate} = useNavigation<NavProps>();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<DonationForm>({
    resolver: yupResolver(schema),
  });

  function handleModal(event: boolean) {
    setIsVisibleModal(event);
  }

  function handleNavigateNext() {
    navigate('ConfirmDonations');
    setIsVisibleModal(false);
  }

  async function onSubmit(data: any) {
    handleNavigateNext();
  }

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Doações" welcome={false} />
      <StyledContent>
        <StyledBoxShowCoins>
          <StyledTextCoin>
            Saldo de moedas Horticoins gerados da sua cesta
          </StyledTextCoin>

          <StyledTextQuantityCoins>0</StyledTextQuantityCoins>
          <StyledIconCoin
            name="monetization-on"
            color={theme.colors.PRIMARY_800}
            size={24}
          />
        </StyledBoxShowCoins>
        <StyledTitle>Ajude no combate a fome</StyledTitle>
        <StyledText>
          Veja abaixo as instituições e projetos cadastrados na nossa rede e
          ajude-nos a atingir a meta do mês doando suas Horticoins que serão
          convertidas em alimentos.
        </StyledText>

        <StyledRow>
          {dataOngServices.map((ong: DonationsOng, index: number) => (
            <CardOng
              key={index}
              title={ong.title}
              image={ong.image}
              onPress={() => handleModal(true)}
              doar
            />
          ))}
        </StyledRow>

        <StyledContainerInfo style={{elevation: 4}}>
          <StyledTextInfo>
            Para saber mais sobre os projetos e instituições que estamos
            ajudando, acesse o nosso site.
          </StyledTextInfo>
          <Button
            title="Ir para site"
            onPress={async () => Linking.openURL(OUR_SITE)}
            size="medium"
            buttonColor="transparent"
            textColor="primary"
          />
        </StyledContainerInfo>

        {isVisibleModal && (
          <ModalDonation
            name="coins"
            control={control}
            onConfirm={handleSubmit(onSubmit)}
            onCancel={() => handleModal(false)}
            onClose={() => handleModal(false)}
            error={isSubmitted ? errors.coins?.message : ''}
          />
        )}
      </StyledContent>
    </StyledContainerScroll>
  );
};

export const StyledContainerScroll = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

export const StyledContent = styled.View`
  width: 90%;
  align-self: center;
  padding: 24px 0;
`;

const StyledBoxShowCoins = styled.View`
  min-height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_800};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledTextCoin = styled.Text`
  width: 80%;
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALL};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

const StyledTextQuantityCoins = styled(StyledTextCoin)`
  width: 10%;
  font-size: ${({theme}) => theme.sizing.LARGEST};
`;

const StyledIconCoin = styled(Icon)`
  width: 10%;
`;

const StyledRow = styled.View`
  margin: 16px 0;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALL};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-bottom: 8px;
`;

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

const StyledContainerInfo = styled.View`
  background-color: ${({theme}) => theme.colors.BACKGROUND};
  border: 1px solid ${({theme}) => theme.colors.GRAY_100};
  border-radius: 4px;
  padding: 16px 8px;
`;

const StyledTextInfo = styled.Text`
  margin-bottom: 16px;
`;
