import React, {memo} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  StyledModal,
  StyledBackgroundModal,
  StyledContent,
  StyledContainerButtons as ContainerButtons,
  StyledConfirmButton,
  StyledCancelButton,
  StyledCloseButton,
} from '../Modal';

import Counter from '../Counter';

interface Props {
  name: string;
  control: any;
  error?: string;
  onConfirm: () => any;
  onCancel: () => any;
  onClose: () => any;
}

const ModalDonation = ({
  name,
  control,
  error,
  onConfirm,
  onCancel,
  onClose,
  ...rest
}: Props) => {
  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <StyledModal animationType="fade" transparent {...rest}>
        <StyledBackgroundModal>
          <StyledContent>
            <StyledCloseButton
              name="close"
              size={20}
              color={theme.colors.GRAY_900}
              backgroundColor={theme.colors.BACKGROUND}
              onPress={onClose}
            />

            <StyledTitle>
              Você escolheu doar para a ONG Criança sem fome!
            </StyledTitle>
            <StyledSubTitle>Você tem 0 moedas</StyledSubTitle>
            <StyledText>Quantas moedas deseja doar?</StyledText>

            <Counter name={name} control={control} />
            {error && <StyledError>{error}</StyledError>}

            <StyledContainerButtons>
              <StyledCancelButton
                buttonColor="text_only"
                textColor="primary"
                size="medium"
                title="Cancelar"
                onPress={onCancel}
              />

              <StyledConfirmButton
                size="medium"
                title="Confirmar"
                onPress={onConfirm}
              />
            </StyledContainerButtons>
          </StyledContent>
        </StyledBackgroundModal>
      </StyledModal>
    </GestureHandlerRootView>
  );
};

const StyledText = styled.Text`
  width: 100%;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  text-align: center;
  margin-bottom: 16px;
`;

const StyledTitle = styled(StyledText)`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALL};
  color: ${({theme}) => theme.colors.PRIMARY_800};
`;

const StyledSubTitle = styled(StyledText)`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
`;

const StyledContainerButtons = styled(ContainerButtons)`
  margin-top: 24px;
`;

const StyledError = styled.Text`
  align-self: center;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.ERROR_800};
  margin-top: 3px;
`;

export default memo(ModalDonation);
