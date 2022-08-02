import React, {useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import IconMaterials from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {GET_PRODUCER} from '@/store/slices/producerSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FinancialProducerStackParamList} from '@/routes/stacks/FinancialProducerStack';
import {useNavigation} from '@react-navigation/native';

import IconPiggyBank from '@/assets/svgs/piggy-bank.svg';

import Header from '@/components/Header';
import ButtonRedirect from '@/components/ButtonRedirect';

type NavProps = NativeStackNavigationProp<
  FinancialProducerStackParamList,
  'RegisterPixFinancialProducer'
>;

export const HomeFinancialProducer = () => {
  const {auth} = useReduxSelector(state => state.user);
  const {producer} = useReduxSelector(state => state.producer);
  const {navigate} = useNavigation<NavProps>();
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (auth?.id) {
      dispatch(GET_PRODUCER({id: auth?.id}));
    }
  }, [auth?.id, dispatch]);

  const renderPix = (key: string, iconName: string) => (
    <StyledContainerPix>
      <StyledContainerInfoPix>
        <IconMaterials
          name={iconName}
          size={20}
          color={theme.colors.PRIMARY_800}
        />
        <StyledText>{key}</StyledText>
      </StyledContainerInfoPix>
      <IconFeather.Button
        name="trash-2"
        size={20}
        color={theme.colors.GRAY_900}
        backgroundColor="transparent"
      />
    </StyledContainerPix>
  );

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Financeiro" welcome={false} />
      <StyledContent>
        <StyledPiggyBank testID="icon-piggy-bank" />
        <StyledTitleBalance>Saldo disponível</StyledTitleBalance>
        {producer?.balance ? (
          <StyledTextBalance>
            {`R$ ${producer?.balance.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}`}
          </StyledTextBalance>
        ) : (
          <StyledTextLoadingBalance>Carregando...</StyledTextLoadingBalance>
        )}
        <ButtonRedirect
          title="Configurar chave pix"
          onPress={() => navigate('RegisterPixFinancialProducer')}
        />
        <ButtonRedirect title="Ver extrato" onPress={() => null} />

        {(producer?.cpfPix ||
          producer?.emailPix ||
          producer?.phonePix ||
          producer?.randomPix) && (
          <>
            <StyledLine />
            <StyledTitlePix>Chaves cadastradas</StyledTitlePix>
            {producer?.cpfPix && renderPix(producer?.cpfPix, 'person')}
            {producer?.emailPix &&
              renderPix(producer?.emailPix, 'mail-outline')}
            {producer?.phonePix &&
              renderPix(producer?.phonePix, 'mobile-friendly')}
            {producer?.randomPix && renderPix(producer?.randomPix, 'vpn-key')}
          </>
        )}
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

const StyledPiggyBank = styled(IconPiggyBank)`
  align-self: center;
`;

const StyledTitleBalance = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGER};
  color: ${({theme}) => theme.colors.GRAY_900};

  text-align: center;
  margin-top: 16px;
`;

const StyledTextBalance = styled(StyledTitleBalance)`
  font-size: ${({theme}) => theme.sizing.LARGEST};
  margin-bottom: 16px;
`;

const StyledTextLoadingBalance = styled.Text``;

const StyledLine = styled.View`
  width: 100%;
  height: 1px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.GRAY_300};
  margin-bottom: 16px;
`;

const StyledContainerInfoPix = styled.View`
  flex-direction: row;
`;

const StyledContainerPix = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledTitlePix = styled.Text`
  font-style: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-bottom: 16px;
`;

const StyledText = styled(StyledTitlePix)`
  font-style: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};

  margin: 0 0 0 10px;
`;
