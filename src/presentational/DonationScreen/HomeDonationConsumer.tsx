import React, {useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import {t} from 'i18next';
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
import ModalDonation from './ModalDonation';
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
  coins: Yup.number().min(1, t('error.minCoins')).required(t('error.required')),
});

const dataOngServices: DonationsOng[] = [
  {
    image: imgOngOne,
    title: t('cardOng.one'),
  },
  {
    image: imgOngTwo,
    title: t('cardOng.two'),
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

  async function onSubmit() {
    handleNavigateNext();
  }

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header
        title={t('text.homeDonationConsumer.headerTitle')}
        welcome={false}
      />
      <StyledContent>
        <StyledBoxShowCoins>
          <StyledTextCoin>
            {t('text.homeDonationConsumer.titleCoins')}
          </StyledTextCoin>

          <StyledTextQuantityCoins>0</StyledTextQuantityCoins>
          <StyledIconCoin
            name="monetization-on"
            color={theme.colors.PRIMARY_800}
            size={24}
          />
        </StyledBoxShowCoins>
        <StyledTitle>{t('text.homeDonationConsumer.titleSection')}</StyledTitle>
        <StyledText>{t('text.homeDonationConsumer.infoSection')}</StyledText>

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
          <StyledTextInfo>{t('text.homeDonationConsumer.info')}</StyledTextInfo>
          <Button
            title={t('button.goToSite')}
            onPress={async () => Linking.openURL(OUR_SITE)}
            size="small"
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
