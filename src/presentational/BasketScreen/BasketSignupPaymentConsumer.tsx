import React, {useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useGetConsumerBasket} from '@/hooks/useGetConsumerBasket';
import {getPixProducer} from '@/helpers/getPixProducer';
import {SvgProps} from 'react-native-svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoggedConsumerStackParamList} from '@/routes/stacks/LoggedConsumerStack';
import {useNavigation} from '@react-navigation/native';
import {translateBasketToPortuguese} from '@/helpers/translate';

import BasketVegetable from '@/assets/svgs/vegetable-basket.svg';

import Header from '@/components/Header';
import RadioForm from '@/components/RadioForm';
import Button from '@/components/Button';
import InputClipboard from '@/components/InputClipboard';
import Modal from '@/components/Modal';

import {
  StyledContainerScroll,
  StyledContent,
  StyledText,
} from './BasketSignupPlanConsumer';

interface Form {
  typeDeleviry: string;
}

const schema = Yup.object().shape({
  typeDeleviry: Yup.string().required('Preenchimento obrigatório'),
});

type NavProps = NativeStackNavigationProp<
  LoggedConsumerStackParamList,
  'ProfileConsumer' | 'DonationConsumerStack'
>;

export const BasketSignupPaymentConsumer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {navigate} = useNavigation<NavProps>();
  const {basketConsumer} = useGetConsumerBasket();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<Form>({resolver: yupResolver(schema)});

  function handleModal(event: boolean) {
    setIsVisibleModal(event);
  }

  function handleNavigateToProfile() {
    handleModal(false);
    navigate('ProfileConsumer');
  }

  function handleNavigateToDonations() {
    handleModal(false);
    navigate('DonationConsumerStack');
  }

  async function onSubmit() {
    handleModal(true);
  }

  return (
    <StyledContainerScroll>
      <Header title="Assinatura" welcome={false} />
      <StyledContent>
        <StyledTitle>Entrega</StyledTitle>
        <StyledText>
          Escolha se você prefere retirar sua cesta em um dos nossos pontos de
          coleta, ou receber em casa pagando uma taxa a mais
        </StyledText>

        <RadioForm
          name="typeDeleviry"
          control={control}
          options={[
            'Retirar no ponto de coleta - R$00,00',
            'Entrega (à combinar com produtor)',
          ]}
          type="withLine"
          error={isSubmitted ? errors.typeDeleviry?.message : ''}
        />

        <StyledCheckoutBox>
          <StyledTitle>Subtotal</StyledTitle>
          <StyledRow>
            {basketConsumer?.basketID.size && (
              <StyledText>{`01 Cesta ${translateBasketToPortuguese(
                basketConsumer?.basketID.size,
              )}`}</StyledText>
            )}

            <StyledText>{`R$ ${basketConsumer?.basketID.value}`}</StyledText>
          </StyledRow>
          <StyledRow>
            <StyledText>Total</StyledText>
            <StyledTextTotalPrice>
              {`R$ ${basketConsumer?.basketID.value}`}
            </StyledTextTotalPrice>
          </StyledRow>
        </StyledCheckoutBox>

        <StyledTitle>Pagamento</StyledTitle>

        <StyledText>
          Realize o pagamento para a chave pix informada abaixo e em seguida
          envie o comprovante de pagamento para o produtor pelo whatsapp.
        </StyledText>

        {basketConsumer &&
          (basketConsumer?.basketProducerID.randomPix ||
            basketConsumer?.basketProducerID.phonePix ||
            basketConsumer?.basketProducerID.emailPix ||
            basketConsumer?.basketProducerID.cpfPix) && (
            <InputClipboard
              text={getPixProducer(basketConsumer?.basketProducerID)}
            />
          )}

        <StyledSubmitButton
          title="Concluir compra"
          onPress={handleSubmit(onSubmit)}
        />

        {isVisibleModal && (
          <Modal
            title="Seu pedido foi confirmado e será preparado!"
            subTitle="Para alinhar a entrega ou coleta da cesta, vá para mensagens e combine todos os detalhes diretamente com o produtor."
            icon={BasketVegetable as React.FC<SvgProps>}
            titleConfirmButton="Ir para mensagens"
            titleCancelButton="Ir para doações"
            columnButtons
            onConfirm={handleNavigateToProfile}
            onCancel={handleNavigateToDonations}
            onClose={() => handleModal(false)}
          />
        )}
      </StyledContent>
    </StyledContainerScroll>
  );
};

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGER};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-bottom: 16px;
`;

const StyledCheckoutBox = styled.View`
  height: 146px;
  justify-content: center;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_800};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextTotalPrice = styled(StyledText)`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
`;

const StyledSubmitButton = styled(Button)`
  margin-top: 24px;
`;
