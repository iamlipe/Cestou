import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {REGISTER, RegisterForm} from '@/store/slices/userSlice';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@/routes/stacks/AuthStack';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';

import RadioForm from '@/components/RadioForm';
import InputForm from '@/components/InputForm';
import CheckboxForm from '@/components/CheckboxForm';
import Button from '@/components/Button';

type NavProps = NativeStackNavigationProp<
  AuthStackParamList,
  'ConfirmRegister'
>;

export const Register = () => {
  const [canGoNext, setCanGoNext] = useState(false);
  const [registerData, setRegisterData] = useState({
    phoneOrEmail: '',
    password: '',
    userType: '',
  });
  const {goBack, navigate} = useNavigation<NavProps>();
  const {isLoading} = useReduxSelector(state => state.user);
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const schema = Yup.object().shape({
    userType: Yup.string().required(t('error.required')),
    name: Yup.string().required(t('error.required')),
    email: Yup.string()
      .min(10, t('error.validEmail'))
      .required(t('error.required')),
    password: Yup.string()
      .min(6, t('error.validPassword'))
      .required(t('error.required')),
    terms: Yup.array().min(1, t('error.terms')).required(),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async data => {
    const firstName = data.name.split(' ')[0];
    const lastName = data.name.split(' ')[1];
    const userType =
      data.userType === t('option.iConsumer') ? 'consumer' : 'producer';

    dispatch(
      REGISTER({
        firstName,
        lastName,
        userType,
        email: data.email,
        password: data.password,
      }),
    );

    Keyboard.dismiss();

    setRegisterData({
      phoneOrEmail: data.email,
      password: data.password,
      userType,
    });

    setCanGoNext(true);
  };

  useEffect(() => {
    if (!isLoading && canGoNext) {
      navigate('ConfirmRegister', registerData);
      setCanGoNext(false);
    }
  }, [isLoading, canGoNext, navigate, registerData]);

  return (
    <StyledContainer>
      <StyledRowTitle>
        <StyledTitle>{t('text.screenRegister.createAnAccount')}</StyledTitle>
        <StyledSubtitle>
          {t('text.screenRegister.enterYourDetails')}
        </StyledSubtitle>
      </StyledRowTitle>
      <StyledContainerForm>
        <RadioForm
          name="userType"
          control={control}
          options={[t('option.iProducer'), t('option.iConsumer')]}
        />

        <InputForm
          name="name"
          label={t('label.name')}
          error={isSubmitted ? errors.name?.message : ''}
          control={control}
        />
        <InputForm
          name="email"
          label={t('label.email')}
          error={isSubmitted ? errors.email?.message : ''}
          control={control}
        />
        <InputForm
          name="password"
          label={t('label.password')}
          error={isSubmitted ? errors.password?.message : ''}
          secureTextEntry
          control={control}
        />
        <StyledTextWarningPassowrd>
          {t('error.validPassword')}
        </StyledTextWarningPassowrd>

        <CheckboxForm
          name="terms"
          control={control}
          options={[t('option.terms')]}
        />
      </StyledContainerForm>

      <Button
        title={t('button.register')}
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
      />

      <StyledRowLogin>
        <StyledText>
          {t('text.screenRegister.alreadyHaveAnAccount?')}
        </StyledText>
        <StyledLink
          buttonColor="text_only"
          textColor="primary"
          title={t('button.signIn')}
          noMargin
          onPress={() => goBack()}
        />
      </StyledRowLogin>
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledContainerForm = styled.View`
  width: 90%;
  align-self: center;
  margin-bottom: 24px;
`;

const StyledRowTitle = styled(StyledContainerForm)`
  margin: 48px 0 0 0;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGEST};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-bottom: 12px;
`;

const StyledSubtitle = styled(StyledTitle)`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  margin-bottom: 24px;
`;

const StyledRowLogin = styled.View`
  flex-direction: row;
  align-self: center;
  margin: 24px 0 48px;
`;

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
`;

const StyledTextWarningPassowrd = styled(StyledText)`
  color: ${({theme}) => theme.colors.GRAY_900};
  margin: -16px 0 24px 0;
`;

const StyledLink = styled(Button)`
  width: auto;
  height: auto;
  margin: 0 5px;
`;
