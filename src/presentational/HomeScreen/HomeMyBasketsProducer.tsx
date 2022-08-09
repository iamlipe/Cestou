import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {translateBasketToEnglish} from '@/helpers/translate';
import {
  GET_BASKET,
  SIGNUP_PRODUCER_BASKET,
  BasketResponse,
} from '@/store/slices/basketSlice';
import {useNavigation} from '@react-navigation/native';

import IconVegetable from '@/assets/svgs/vegetable.svg';

import Header from '@/components/Header';
import Checkbox from '@/components/CheckboxForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import {SvgProps} from 'react-native-svg';

interface SignupBasket {
  myBasket: string[];
}

const schema = Yup.object().shape({
  myBasket: Yup.array()
    .min(1, 'Selecione ao menos um produto')
    .required('Preenchimento obrigatório'),
});

export const HomeMyBasketsProducer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {isLoading, allBaskets} = useReduxSelector(state => state.basket);
  const {goBack} = useNavigation();
  const dispatch = useReduxDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<SignupBasket>({
    resolver: yupResolver(schema),
  });

  function handleModal(event: boolean) {
    setIsVisibleModal(event);
  }

  function signProducerBasket(data: SignupBasket) {
    data.myBasket.forEach((selectedBasket: string) => {
      const translatedBasket = translateBasketToEnglish(selectedBasket);

      const basketID = allBaskets.find(
        (basket: BasketResponse) => basket.size === translatedBasket,
      )?.id;

      if (basketID) dispatch(SIGNUP_PRODUCER_BASKET({basketID}));
    });
  }

  async function onSubmit(data: SignupBasket) {
    signProducerBasket(data);
    handleModal(true);
  }

  useEffect(() => {
    dispatch(GET_BASKET());
  }, [dispatch]);

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Minhas cestas" welcome={false} />
      <StyledContent>
        <StyledText>
          Escolha abaixo qual o tamanho da cesta você deseja fornecer, e veja
          quantos e quais os tipos de alimentos em cada uma.Escolha abaixo qual
          o tamanho da cesta você deseja fornecer, e veja quantos e quais os
          tipos de alimentos em cada uma.
        </StyledText>
        <StyledObservationText>
          Obs: Você pode selecionar mais de um tamanho
        </StyledObservationText>

        <Checkbox
          name="myBasket"
          control={control}
          options={['Pequena', 'Média', 'Grande']}
          detailsOptions={[
            '1 tempero, 2 legumes, 2 verduras , 3 frutas',
            '2 temperos, 3 legumes, 3 verduras, 3 frutas e 1 processado',
            '3 temperos, 4 legumes, 4 verduras, 4 frutas e 1 processado',
          ]}
          error={isSubmitted ? errors.myBasket?.message : ''}
        />

        <StyledSubmitButton
          testID="subimit-button"
          title="Confirmar seleção"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />

        {!isLoading && isVisibleModal && (
          <Modal
            title="Você adicionou as cestas à sua lista de produtos fornecidos."
            icon={IconVegetable as React.FC<SvgProps>}
            onConfirm={() => {
              handleModal(false);
              goBack();
            }}
            onCancel={() => handleModal(false)}
            onClose={() => handleModal(false)}
          />
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

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-bottom: 16px;
`;

const StyledObservationText = styled(StyledText)`
  font-size: ${({theme}) => theme.sizing.SMALLEST};
`;

const StyledSubmitButton = styled(Button)`
  margin-top: 24px;
`;
