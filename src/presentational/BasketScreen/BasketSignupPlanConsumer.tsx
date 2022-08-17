import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BasketConsumerStackParamList} from '@/routes/stacks/BasketConsumerStack';
import {
  BasketProducerRequest,
  GET_BASKET_PRODUCER,
  SIGNUP_CONSUMER_BASKET,
} from '@/store/slices/basketSlice';

import Header from '@/components/Header';
import RadioForm from '@/components/RadioForm';
import Button from '@/components/Button';

type NavProps = NativeStackNavigationProp<
  BasketConsumerStackParamList,
  'BasketSignupFoodConsumer'
>;

export const BasketSignupPlanConsumer = () => {
  const [canGoNext, setCanGoNext] = useState(false);
  const {basketProducer, canSignupBasketConsumer, isLoading} = useReduxSelector(
    state => state.basket,
  );
  const {navigate} = useNavigation<NavProps>();
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const schema = Yup.object().shape({
    daysPerDeliver: Yup.string().required(t('error.required')),
    size: Yup.string().required(t('error.required')),
  });

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
  }

  useEffect(() => {
    if (canSignupBasketConsumer && basketProducer && !isLoading) {
      dispatch(
        SIGNUP_CONSUMER_BASKET({
          basketID: basketProducer.basket_id,
          producerID: basketProducer.user_id,
        }),
      );

      setCanGoNext(true);
    }
  }, [basketProducer, canSignupBasketConsumer, dispatch, isLoading]);

  useEffect(() => {
    if (!isLoading && canGoNext) {
      navigate('BasketSignupFoodConsumer');
      setCanGoNext(false);
    }
  }, [isLoading, canGoNext, navigate]);

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header
        title={t('text.basketSignupPlanConsumer.headerTitle')}
        welcome={false}
      />
      <StyledContent>
        <StyledTitle>{t('text.basketSignupPlanConsumer.title')}</StyledTitle>
        <StyledLabel>
          {t('text.basketSignupPlanConsumer.instructionOne')}
        </StyledLabel>

        <RadioForm
          name="daysPerDeliver"
          control={control}
          options={[
            t('option.daysPerDeliverWeekly'),
            t('option.daysPerDeliverFortnightly'),
          ]}
          type="withBox"
          error={isSubmitted ? errors.daysPerDeliver?.message : ''}
        />

        <StyledLabel>
          {t('text.basketSignupPlanConsumer.instructionTwo')}
        </StyledLabel>

        <StyledLine />
        <RadioForm
          name="size"
          control={control}
          options={[
            t('option.smallBasket'),
            t('option.mediumBasket'),
            t('option.largeBasket'),
          ]}
          detailsOptions={[
            t('detailsOption.smallBasket'),
            t('detailsOption.mediumBasket'),
            t('detailsOption.largeBasket'),
          ]}
          type="withBox"
          error={isSubmitted ? errors.size?.message : ''}
        />
        <StyledText>{t('text.basketSignupPlanConsumer.note')}</StyledText>

        <StyledSubmitButton
          title={t('button.next')}
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
