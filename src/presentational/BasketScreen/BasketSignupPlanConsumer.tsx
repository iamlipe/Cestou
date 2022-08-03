import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {GET_BASKET} from '@/store/slices/basketSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BasketConsumerStackParamList} from '@/routes/stacks/BasketConsumerStack';

import Header from '@/components/Header';
import RadioForm from '@/components/RadioForm';
import Button from '@/components/Button';

const schema = Yup.object().shape({
  daysPerDeliver: Yup.string().required('Preenchimento obrigatório'),
  size: Yup.string().required('Preenchimento obrigatório'),
});

interface SubmitForm {
  daysPerDeliver: string;
  size: string;
}

type NavProps = NativeStackNavigationProp<
  BasketConsumerStackParamList,
  'BasketSignupFoodConsumer'
>;

export const BasketSignupPlanConsumer = () => {
  const {navigate} = useNavigation<NavProps>();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<SubmitForm>({resolver: yupResolver(schema)});

  function handleNavigate(data: SubmitForm) {
    navigate('BasketSignupFoodConsumer', {...data});
  }

  async function onSubmit(data: SubmitForm) {
    handleNavigate(data);
  }

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

        <StyledSubmitButton title="Próximo" onPress={handleSubmit(onSubmit)} />
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

const StyledText = styled(StyledLabel)``;

const StyledLine = styled.View`
  width: 100%;
  height: 1px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.GRAY_100};
  margin-bottom: 16px;
`;

const StyledSubmitButton = styled(Button)``;
