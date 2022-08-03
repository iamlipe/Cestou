import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useForm} from 'react-hook-form';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {GET_FOODS_BASKET} from '@/store/slices/foodSlice';
import {useNavigation} from '@react-navigation/native';
import {BasketConsumerStackParamList} from '@/routes/stacks/BasketConsumerStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SvgProps} from 'react-native-svg';

import IconVegetable from '@/assets/svgs/vegetable.svg';

import Header from '@/components/Header';
import CardFood from '@/components/CardFood';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

import {
  StyledContainerScroll,
  StyledContent,
  StyledText,
} from './BasketSignupPlanConsumer';

type NavProps = NativeStackNavigationProp<
  BasketConsumerStackParamList,
  'BasketSignupFoodConsumer'
>;

export const BasketSignupFoodConsumer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {basketProducer} = useReduxSelector(state => state.basket);
  const {foodsBasket} = useReduxSelector(state => state.food);
  const {navigate} = useNavigation<NavProps>();
  const dispatch = useReduxDispatch();

  const {control, handleSubmit} = useForm();

  function handleModal(event: boolean) {
    setIsVisibleModal(event);
  }

  function handleNavigateNext() {
    navigate('BasketSignupPaymentConsumer');
    handleModal(false);
  }

  async function onSubmit() {
    handleModal(true);
  }

  useEffect(() => {
    if (basketProducer) {
      dispatch(GET_FOODS_BASKET({id: basketProducer?.basket_id}));
    }
  }, [basketProducer, dispatch]);

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Assinatura" welcome={false} />
      <StyledContent>
        <StyledText>
          Você escolheu a cesta de tamanho médio (12 itens), selecione quantas
          porções de cada categoria deseja receber.
        </StyledText>

        <StyledWarningBox>
          <StyledWarningBoxTitle>Importante!</StyledWarningBoxTitle>
          <StyledWarningBoxText>
            Cada unidade de alimento retirada da sua cesta, é convertida em
            Horticoins, nossa moeda virtual que é utilizada por instituições
            parceiras para adquirir alimentos e ajudar no combate a fome!
          </StyledWarningBoxText>
        </StyledWarningBox>

        {foodsBasket?.map(food => (
          <CardFood
            key={food.id}
            name={food.foodID.name}
            image={food.foodID.imageUrl}
            control={control}
            maxQuantity={food.quantity}
          />
        ))}

        <StyledSubmitButton title="Próximo" onPress={handleSubmit(onSubmit)} />

        {isVisibleModal && (
          <Modal
            title="Você retirou 1 item da sua cesta!"
            subTitle="Este item será convertido na moeda Horticoin, e você poderá doá-la para uma instituição parceira que atua no combate a fome."
            icon={IconVegetable as React.FC<SvgProps>}
            onPress={() => handleNavigateNext()}
          />
        )}
      </StyledContent>
    </StyledContainerScroll>
  );
};

const StyledWarningBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({theme}) => theme.colors.WARNING_500};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 36px;
`;

const StyledWarningBoxTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALL};
  color: ${({theme}) => theme.colors.GRAY_900};
  text-align: center;
  margin-bottom: 8px;
`;

const StyledWarningBoxText = styled(StyledText)`
  margin-bottom: 0;
`;

const StyledSubmitButton = styled(Button)`
  margin-top: 24px;
`;
