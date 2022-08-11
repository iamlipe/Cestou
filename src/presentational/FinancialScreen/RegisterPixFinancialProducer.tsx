import React, {useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {
  GET_PRODUCER,
  RegisterPixRequest,
  REGISTER_PIX,
} from '@/store/slices/producerSlice';
import {yupResolver} from '@hookform/resolvers/yup';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useTranslation} from 'react-i18next';
import {translatePixType} from '@/helpers/translate';
import {SvgProps} from 'react-native-svg';

import IconPiggy from '@/assets/svgs/piggy.svg';

import Header from '@/components/Header';
import RadioForm from '@/components/RadioForm';
import InputForm from '@/components/InputForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

const schema = Yup.object().shape({
  pixType: Yup.string().required('Preenchimento obrigatório'),
  pixValue: Yup.string().required('Preenchimento obrigatório'),
});

export const RegisterPixFinancialProducer = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {auth} = useReduxSelector(state => state.user);
  const {isLoading} = useReduxSelector(state => state.producer);
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<RegisterPixRequest>({
    resolver: yupResolver(schema),
  });

  function registerPix(data: RegisterPixRequest) {
    const pixType = translatePixType(data.pixType);

    console.log(pixType);

    if (pixType) dispatch(REGISTER_PIX({pixType, pixValue: data.pixValue}));
    if (auth?.id) dispatch(GET_PRODUCER({id: auth?.id}));
  }

  function handleModal(event: boolean) {
    setIsVisibleModal(event);
  }

  async function onSubmit(data: RegisterPixRequest) {
    registerPix(data);
    handleModal(true);
  }

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header
        title={t('Text.ScreenRegisterPixFinancialProducer.HeaderTitle')}
        welcome={false}
      />
      <StyledContent>
        <StyledText>
          {t('Text.ScreenRegisterPixFinancialProducer.InstructionOne')}
        </StyledText>
        <RadioForm
          name="pixType"
          control={control}
          options={[
            t('Option.TypePixCPF'),
            t('Option.TypePixPhone'),
            t('Option.TypePixEmail'),
            t('Option.TypePixRandom'),
          ]}
          error={isSubmitted ? errors.pixType?.message : ''}
          type="withLine"
        />
        <StyledText>
          {t('Text.ScreenRegisterPixFinancialProducer.InstructionTwo')}
        </StyledText>
        <InputForm
          name="pixValue"
          control={control}
          error={isSubmitted ? errors.pixValue?.message : ''}
          label={t('Label.PixValue')}
        />
        <Button
          title={t('Button.RegisterPix')}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />

        {!isLoading && isVisibleModal && (
          <Modal
            title={t('Modal.TitleRegisterPix')}
            icon={IconPiggy as React.FC<SvgProps>}
            onClose={() => handleModal(false)}
            justMessage
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
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-bottom: 16px;
`;
