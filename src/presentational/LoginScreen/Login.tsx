import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import i18next from 'i18next';
import * as Yup from 'yup';
import {Keyboard} from 'react-native';
import {useForm} from 'react-hook-form';
import {LOGIN, LoginRequest, REMEMBER_USER} from '@/store/slices/userSlice';
import {yupResolver} from '@hookform/resolvers/yup';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@/routes/stacks/AuthStack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import Logo from '@/assets/svgs/logo.svg';

import InputForm from '@/components/InputForm/index';
import Button from '@/components/Button';
import CheckboxForm from '@/components/CheckboxForm';
import Info from '@/components/Info';

const schema = Yup.object().shape({
  phoneOrEmail: Yup.string()
    .email(i18next.t('Error.ValidEmail'))
    .required(i18next.t('Error.Required')),
  password: Yup.string().required(i18next.t('Error.Required')),
});

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const Login = () => {
  const userReducer = useReduxSelector(({user}) => user);
  const userStorage = useAsyncStorage('@user');
  const {navigate, addListener} = useNavigation<NavProps>();
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: LoginRequest) {
    await handleLogin(data);
    Keyboard.dismiss();
  }

  async function handleLogin(data: LoginRequest) {
    dispatch(
      LOGIN({
        phoneOrEmail: data.phoneOrEmail,
        password: data.password,
        remember: data.remember,
      }),
    );
  }

  async function handleRemember() {
    const user = await userStorage.getItem();

    if (user) dispatch(REMEMBER_USER(JSON.parse(user)));
  }

  useEffect(() => {
    addListener('beforeRemove', event => {
      event.preventDefault();
    });
  });

  useEffect(() => {
    handleRemember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <StyledContainerScroll showsVerticalScrollIndicator={false}>
        <StyledLogo testID="logo" />
        <StyledContainerForm>
          <InputForm
            control={control}
            name="phoneOrEmail"
            label={t('Label.Email')}
            error={
              (isSubmitted && errors.phoneOrEmail?.message) ||
              (userReducer.error?.response && t('Error.Login'))
            }
          />
          <InputForm
            control={control}
            name="password"
            label={t('Label.Password')}
            secureTextEntry
            error={
              (isSubmitted && errors.password?.message) ||
              (userReducer.error?.response && t('Error.Login'))
            }
          />

          <StyledRowRecoverPassword>
            <StyledText>{t('Text.ScreenLogin.ForgotYourPassword?')}</StyledText>
            <StyledLink
              buttonColor="text_only"
              textColor="primary"
              title={t('Button.RecoveryPassword')}
              size="small"
              noMargin
              onPress={() => null}
            />
          </StyledRowRecoverPassword>

          <CheckboxForm
            control={control}
            name="remember"
            options={[`${t('Option.RememberMe')}`]}
          />
        </StyledContainerForm>
        <StyledButtonSubmit
          onPress={handleSubmit(onSubmit)}
          loading={userReducer.isLoading}
          title={t('Button.Login')}
          noMargin
        />

        <StyledRowRegister>
          <StyledText>{t('Text.ScreenLogin.DoNotHaveAnAccount?')}</StyledText>
          <StyledLink
            buttonColor="text_only"
            textColor="primary"
            title={t('Button.SignUp')}
            noMargin
            onPress={() => navigate('Register')}
          />
        </StyledRowRegister>
        <StyledLine />
        <Info />
      </StyledContainerScroll>
    </StyledContainer>
  );
};

const StyledContainer = styled.SafeAreaView``;

const StyledContainerScroll = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledContainerForm = styled.View`
  width: 90%;
  align-self: center;
`;

const StyledLogo = styled(Logo)`
  align-self: center;
  margin: 64px 0;
`;

const StyledRowRecoverPassword = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledRowRegister = styled(StyledRowRecoverPassword)`
  align-self: center;
  margin-top: 20px;
`;

const StyledLink = styled(Button)`
  width: auto;
  height: auto;
  margin: 0 5px;
`;

const StyledLine = styled.View`
  width: 90%;
  height: 1px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.GRAY_100};
  margin-bottom: 20px;
`;

const StyledButtonSubmit = styled(Button)`
  margin-top: 40px;
`;

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
`;
