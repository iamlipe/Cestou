import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useForm} from 'react-hook-form';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {BasketConsumerStackParamList} from '@/routes/stacks/BasketConsumerStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SvgProps} from 'react-native-svg';
import {useGetFoodBasket} from '@/hooks/useGetFoodBasket';
import {
  BasketFoodQuantity,
  REMOVE_FOOD_BASKET,
} from '@/store/slices/basketSlice';

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
  const [canGoNext, setCanGoNext] = useState(false);
  const [foodsInMyBasket, setfoodsInMyBasket] = useState<BasketFoodQuantity>(
    {},
  );
  const [quantityFoodInMyBasket, setQuantityFoodInMyBasket] = useState(0);
  const {foodsBasket} = useGetFoodBasket();
  const {basketProducer, isLoading, error} = useReduxSelector(
    state => state.basket,
  );
  const {navigate} = useNavigation<NavProps>();
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const {control, handleSubmit} = useForm<BasketFoodQuantity>();

  function handleModal(event: boolean) {
    setIsVisibleModal(event);
  }

  function removeFoodBasket() {
    if (foodsBasket) {
      dispatch(REMOVE_FOOD_BASKET({foodsBasket, foodsInMyBasket}));
    }
  }

  function sumQuntityFoods(data: number[] | undefined) {
    if (data) {
      const sum = data.reduce((acc, curr) => acc + curr, 0);

      return sum;
    }

    return 0;
  }

  function handleQuantityFoodRemoved(data: BasketFoodQuantity) {
    if (foodsBasket) {
      const totalFoods = sumQuntityFoods(
        foodsBasket?.map(food => food.quantity),
      );

      const totalAfterRemove = sumQuntityFoods(Object.values(data));

      setQuantityFoodInMyBasket(totalFoods - totalAfterRemove);
    }
  }

  async function onSubmit(data: BasketFoodQuantity) {
    handleQuantityFoodRemoved(data);
    setfoodsInMyBasket(data);
    handleModal(true);
  }

  useEffect(() => {
    if (!isLoading && canGoNext) {
      navigate('BasketSignupPaymentConsumer');
      handleModal(false);
      setCanGoNext(false);
    }
  }, [isLoading, canGoNext, navigate]);

  return (
    <StyledContainerScroll
      showsVerticalScrollIndicator={false}
      testID="basket-signup-food-consumer-screen">
      <Header
        title={t('text.basketSignupFoodConsumer.headerTitle')}
        welcome={false}
      />
      <StyledContent>
        <StyledText>
          {t('text.basketSignupFoodConsumer.infoBasket', {
            size: basketProducer?.basket_size,
            quantity: sumQuntityFoods(foodsBasket?.map(food => food.quantity)),
          })}
        </StyledText>

        <StyledWarningBox>
          <StyledWarningBoxTitle>
            {t('text.basketSignupFoodConsumer.warning')}
          </StyledWarningBoxTitle>
          <StyledWarningBoxText>
            {t('text.basketSignupFoodConsumer.warningText')}
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

        <StyledSubmitButton
          testID="submit-button-food"
          title={t('button.next')}
          onPress={handleSubmit(onSubmit)}
        />

        {isVisibleModal && (
          <Modal
            title={t('modal.titleInfoAboutBasket', {
              counter: quantityFoodInMyBasket,
            })}
            subTitle={t('modal.subTitleInfoAboutBasket')}
            icon={IconVegetable as React.FC<SvgProps>}
            onConfirm={() => {
              removeFoodBasket();
              setCanGoNext(true);
            }}
            onCancel={() => handleModal(false)}
            onClose={() => handleModal(false)}
            isLoading={isLoading}
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
