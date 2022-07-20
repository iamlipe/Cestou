import React from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LOGIN, REGISTER, RegisterRequest} from '@/store/slices/userSlice';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {Keyboard} from 'react-native';

import RadioForm from '@/components/RadioForm';
import InputForm from '@/components/InputForm';
import CheckboxForm from '@/components/CheckboxForm';
import Button from '@/components/Button';

const schema = Yup.object().shape({
  userType: Yup.string().required('Preenchimento obrigatório'),
  name: Yup.string().required('Preenchimento obrigatório'),
  email: Yup.string()
    .min(10, 'Insira um email válido')
    .required('Preenchimento obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter pelo menos 6 dígitos')
    .required('Preenchimento obrigatório'),
  terms: Yup.array().min(1, 'Você precisa aceitar os termos de uso').required(),
});

export const Register = () => {
  const userReducer = useReduxSelector(({user}) => user);
  const dispatch = useReduxDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async data => {
    dispatch(REGISTER(data));
    dispatch(
      LOGIN({
        phoneOrEmail: data.email,
        password: data.password,
      }),
    );

    Keyboard.dismiss();
  };

  return (
    <StyledContainer>
      <StyledRowTitle>
        <StyledTitle>Criar conta</StyledTitle>
        <StyledSubtitle>
          Informe seus dados para criar uma nova conta:
        </StyledSubtitle>
      </StyledRowTitle>
      <StyledContainerForm>
        <RadioForm
          name="userType"
          control={control}
          options={['Sou produtor', 'Sou consumidor']}
        />

        <InputForm
          name="name"
          label="Nome"
          error={isSubmitted ? errors.name?.message : ''}
          control={control}
        />
        <InputForm
          name="email"
          label="Email"
          error={isSubmitted ? errors.email?.message : ''}
          control={control}
        />
        <InputForm
          name="password"
          label="Senha"
          error={isSubmitted ? errors.password?.message : ''}
          secureTextEntry
          control={control}
        />
        <StyledTextWarningPassowrd>
          A senha deve conter pelo menos 6 caracteres.
        </StyledTextWarningPassowrd>

        <CheckboxForm
          name="terms"
          control={control}
          options={['Concordo com a Política de Privacidade e Termos de uso']}
        />
      </StyledContainerForm>

      <Button
        title="Finalizar cadastro"
        loading={userReducer.isLoading}
        onPress={handleSubmit(onSubmit)}
      />

      <StyledRowLogin>
        <StyledText>Já tem uma conta?</StyledText>
        <StyledLink
          buttonColor="text_only"
          textColor="primary"
          title="Faça Login"
          noMargin
          onPress={() => null}
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
