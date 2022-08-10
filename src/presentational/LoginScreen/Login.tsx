import React, {useEffect} from 'react';
import styled from 'styled-components/native';
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

import Logo from '@/assets/svgs/logo.svg';

import InputForm from '@/components/InputForm/index';
import Button from '@/components/Button';
import CheckboxForm from '@/components/CheckboxForm';
import Info from '@/components/Info';

const schema = Yup.object().shape({
  phoneOrEmail: Yup.string()
    .email('Informe um email válido')
    .required('Preenchimento obrigatório'),
  password: Yup.string().required('Preenchimento obrigatório'),
});

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const Login = () => {
  const userReducer = useReduxSelector(({user}) => user);
  const userStorage = useAsyncStorage('@user');
  const {navigate, addListener} = useNavigation<NavProps>();
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
            label="E-mail"
            error={
              (isSubmitted && errors.phoneOrEmail?.message) ||
              (userReducer.error?.response && 'telefone ou senha incorretos')
            }
          />
          <InputForm
            control={control}
            name="password"
            label="Senha"
            secureTextEntry
            error={
              (isSubmitted && errors.password?.message) ||
              (userReducer.error?.response && 'telefone ou senha incorretos')
            }
          />

          <StyledRowRecoverPassword>
            <StyledText>Esqueceu a senha?</StyledText>
            <StyledLink
              buttonColor="text_only"
              textColor="primary"
              title="Recuperar senha"
              size="small"
              noMargin
              onPress={() => null}
            />
          </StyledRowRecoverPassword>

          <CheckboxForm
            control={control}
            name="remember"
            options={['Lembrar minha senha']}
          />
        </StyledContainerForm>
        <StyledButtonSubmit
          onPress={handleSubmit(onSubmit)}
          loading={userReducer.isLoading}
          title="Entrar"
          noMargin
        />

        <StyledRowRegister>
          <StyledText>Ainda não tem conta?</StyledText>
          <StyledLink
            buttonColor="text_only"
            textColor="primary"
            title="Cadastre-se"
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
