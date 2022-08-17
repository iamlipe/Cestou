import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {SvgProps} from 'react-native-svg';
import {useForm} from 'react-hook-form';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  GET_BASKET,
  SIGNUP_PRODUCER_BASKET,
  BasketResponse,
} from '@/store/slices/basketSlice';

import {translateBasketToEnglish} from '@/helpers/translate';

import IconVegetable from '@/assets/svgs/vegetable.svg';

import Header from '@/components/Header';
import Checkbox from '@/components/CheckboxForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

interface SignupBasket {
  myBasket: string[];
}

export const HomeMyBasketsProducer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {isLoading, allBaskets} = useReduxSelector(state => state.basket);
  const {goBack} = useNavigation();
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const schema = Yup.object().shape({
    myBasket: Yup.array()
      .min(1, t('error.minProduct'))
      .required(t('error.required')),
  });

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
      <Header
        title={t('text.screenHomeMyBasketsProducer.titleHeader')}
        welcome={false}
      />
      <StyledContent>
        <StyledText>
          {t('text.screenHomeMyBasketsProducer.instructions')}
        </StyledText>
        <StyledObservationText>
          {t('text.screenHomeMyBasketsProducer.note')}
        </StyledObservationText>

        <Checkbox
          name="myBasket"
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
          error={isSubmitted ? errors.myBasket?.message : ''}
        />

        <StyledSubmitButton
          testID="subimit-button"
          title={t('button.confirm')}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />

        {!isLoading && isVisibleModal && (
          <Modal
            title={t('modal.titleConfirmProducerBasket')}
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
