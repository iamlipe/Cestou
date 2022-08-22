import React, {useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useGetConsumerBasket} from '@/hooks/useGetConsumerBasket';
import {useTranslation} from 'react-i18next';
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
import InputClipboard from '@/presentational/BasketScreen/InputClipboard';
import Modal from '@/components/Modal';

import {
  StyledContainerScroll,
  StyledContent,
  StyledText,
} from './BasketSignupPlanConsumer';

interface Form {
  typeDeleviry: string;
}

type NavProps = NativeStackNavigationProp<
  LoggedConsumerStackParamList,
  'ProfileConsumer' | 'DonationConsumerStack'
>;

export const BasketSignupPaymentConsumer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {navigate} = useNavigation<NavProps>();
  const {t, i18n} = useTranslation();
  const {basketConsumer} = useGetConsumerBasket();

  const schema = Yup.object().shape({
    typeDeleviry: Yup.string().required(t('error.required')),
  });

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
    <StyledContainerScroll
      showsVerticalScrollIndicator={false}
      testID="basket-signup-payment-consumer-screen">
      <Header
        title={t('text.basketSignupPaymentConsumer.headerTitle')}
        welcome={false}
      />
      <StyledContent>
        <StyledTitle>
          {t('text.basketSignupPaymentConsumer.titleSectionOne')}
        </StyledTitle>
        <StyledText>
          {t('text.basketSignupPaymentConsumer.instructionSectionOne')}
        </StyledText>

        <RadioForm
          name="typeDeleviry"
          control={control}
          options={[
            t('option.typeDeliveryCollectPoint'),
            t('option.typeDeliveryHome'),
          ]}
          type="withLine"
          error={isSubmitted ? errors.typeDeleviry?.message : ''}
        />

        <StyledCheckoutBox>
          <StyledTitle>
            {t('text.basketSignupPaymentConsumer.checkoutTitle')}
          </StyledTitle>
          <StyledRow>
            {basketConsumer?.basketID.size && (
              <StyledText>
                {t(
                  'text.basketSignupPaymentConsumer.checkoutDescriptionBasket',
                  {
                    size:
                      i18n.language === 'pt'
                        ? translateBasketToPortuguese(
                            basketConsumer?.basketID.size,
                          )
                        : basketConsumer?.basketID.size,
                  },
                )}
              </StyledText>
            )}

            <StyledText>
              {t('text.basketSignupPaymentConsumer.checkoutPriceBasket', {
                price: basketConsumer?.basketID.value,
              })}
            </StyledText>
          </StyledRow>
          <StyledRow>
            <StyledText>
              {t('text.basketSignupPaymentConsumer.checkoutTotal')}
            </StyledText>
            <StyledTextTotalPrice>
              {t('text.basketSignupPaymentConsumer.checkoutTotalPriceBasket', {
                price: basketConsumer?.basketID.value,
              })}
            </StyledTextTotalPrice>
          </StyledRow>
        </StyledCheckoutBox>

        <StyledTitle>
          {t('text.basketSignupPaymentConsumer.titleSectionTwo')}
        </StyledTitle>

        <StyledText>
          {t('text.basketSignupPaymentConsumer.instructionSectionTwo')}
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
          testID="submit-button-payment"
          title={t('button.completePurchase')}
          onPress={handleSubmit(onSubmit)}
        />

        {isVisibleModal && (
          <Modal
            title={t('modal.titleCompletePurchase')}
            subTitle={t('modal.subTileCompletePurchase')}
            icon={BasketVegetable as React.FC<SvgProps>}
            titleConfirmButton={t('button.goToMessages')}
            titleCancelButton={t('button.goToDonations')}
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
