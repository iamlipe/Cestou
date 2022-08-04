import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BasketConsumerStackParamList} from '@/routes/stacks/BasketConsumerStack';
import {
  BasketProducerRequest,
  GET_BASKET_PRODUCER,
} from '@/store/slices/basketSlice';

import Header from '@/components/Header';
import RadioForm from '@/components/RadioForm';
import Button from '@/components/Button';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';

const schema = Yup.object().shape({
  daysPerDeliver: Yup.string().required('Preenchimento obrigatório'),
  size: Yup.string().required('Preenchimento obrigatório'),
});

type NavProps = NativeStackNavigationProp<
  BasketConsumerStackParamList,
  'BasketSignupFoodConsumer'
>;

export const BasketSignupPlanConsumer = () => {
  const [canGoNext, setCanGoNext] = useState(false);
  const {isLoading} = useReduxSelector(state => state.basket);
  const {navigate} = useNavigation<NavProps>();
  const dispatch = useReduxDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<BasketProducerRequest>({resolver: yupResolver(schema)});

  function getBasketProducer(data: BasketProducerRequest) {
    dispatch(GET_BASKET_PRODUCER(data));
  }

  async function onSubmit(data: BasketProducerRequest) {
    getBasketProducer(data);
    setCanGoNext(true);
  }

  useEffect(() => {
    if (!isLoading && canGoNext) {
      navigate('BasketSignupFoodConsumer');
      setCanGoNext(false);
    }
  }, [isLoading, canGoNext, navigate]);

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Assinatura" welcome={false} />
      <StyledContent>
        <StyledTitle>Vamos configurar seu plano</StyledTitle>
        <StyledLabel>
          Escolha qual a frequência de recebimento ou retirada da sua cesta:
        </StyledLabel>
        <RadioForm
          name="daysPerDeliver"
          control={control}
          options={['Semanal', 'Quinzenal']}
          type="withBox"
          error={isSubmitted ? errors.daysPerDeliver?.message : ''}
        />

        <StyledLabel>
          Escolha qual o tamanho deseja para sua cesta de alimentos:
        </StyledLabel>

        <StyledLine />
        <RadioForm
          name="size"
          control={control}
          options={[
            'Pequena - R$ 45,00',
            'Média - R$ 70,00',
            'Grande - R$90,00',
          ]}
          detailsOptions={[
            '1 tempero, 2 legumes, 2 verduras , 3 frutas',
            '2 temperos, 3 legumes, 3 verduras, 3 frutas e 1 processado',
            '3 temperos, 4 legumes, 4 verduras, 4 frutas e 1 processado',
          ]}
          type="withBox"
          error={isSubmitted ? errors.size?.message : ''}
        />
        <StyledText>
          Obs: O valor informado acima é cobrado de acordo com a frequência
          escolhida.
        </StyledText>

        <StyledSubmitButton
          title="Próximo"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
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

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGEST};
  color: ${({theme}) => theme.colors.GRAY_900};
  text-align: center;
  margin-bottom: 24px;
`;

const StyledLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-bottom: 16px;
`;

export const StyledText = styled(StyledLabel)``;

const StyledLine = styled.View`
  width: 100%;
  height: 1px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.GRAY_100};
  margin-bottom: 16px;
`;

const StyledSubmitButton = styled(Button)``;
