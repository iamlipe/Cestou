import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {ModalProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

import Button from '@/components/Button';

interface PropsTitle {
  justMessage: boolean;
  withSubtitle: boolean;
}

interface PropsContainerButtons {
  columnButtons: boolean;
}

interface Props extends ModalProps {
  title?: string;
  subTitle?: string;
  icon?: React.FC<SvgProps>;
  justMessage?: boolean;
  isLoading?: boolean;
  titleConfirmButton?: string;
  titleCancelButton?: string;
  columnButtons?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const Modal = ({
  title,
  subTitle,
  icon: Icon,
  justMessage = false,
  isLoading = false,
  titleConfirmButton,
  titleCancelButton,
  columnButtons = false,
  onConfirm,
  onCancel,
  onClose,
  ...rest
}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <GestureHandlerRootView>
      <StyledModal animationType="fade" transparent {...rest}>
        <StyledBackgroundModal>
          <StyledContent>
            {onClose && (
              <StyledCloseButton
                testID="close-button"
                name="close"
                size={20}
                color={theme.colors.GRAY_900}
                backgroundColor={theme.colors.BACKGROUND}
                onPress={onClose}
              />
            )}

            {Icon && (
              <StyledCircle>
                <Icon testID="icon-modal" width={60} height={60} />
              </StyledCircle>
            )}

            {title && (
              <StyledTitle justMessage={justMessage} withSubtitle={!!subTitle}>
                {title}
              </StyledTitle>
            )}

            {subTitle && <StyledSubTitle>{subTitle}</StyledSubTitle>}

            {!justMessage && onCancel && onConfirm && (
              <StyledContainerButtons columnButtons={columnButtons}>
                <StyledCancelButton
                  testID="cancel-button"
                  size={columnButtons ? 'medium' : 'small'}
                  buttonColor={columnButtons ? 'transparent' : 'text_only'}
                  textColor="primary"
                  title={titleCancelButton || t('button.cancel')}
                  onPress={onCancel}
                />

                <StyledConfirmButton
                  testID="confirm-button"
                  size={columnButtons ? 'medium' : 'small'}
                  title={titleConfirmButton || t('button.confirm')}
                  onPress={onConfirm}
                  loading={isLoading}
                />
              </StyledContainerButtons>
            )}
          </StyledContent>
        </StyledBackgroundModal>
      </StyledModal>
    </GestureHandlerRootView>
  );
};

export const StyledModal = styled.Modal``;

export const StyledBackgroundModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.BACKGROUND_MODAL};
`;

export const StyledContent = styled.View`
  width: 80%;
  align-items: flex-end;
  padding: 16px;
  border-radius: 4px;
  background-color: ${({theme: {colors}}) => colors.BACKGROUND};
`;

export const StyledTitle = styled.Text<PropsTitle>`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALL};
  color: ${({justMessage, withSubtitle, theme}) =>
    justMessage || withSubtitle
      ? theme.colors.PRIMARY_800
      : theme.colors.GRAY_900};
  margin: ${({justMessage, withSubtitle}) =>
    justMessage || withSubtitle ? '16px 0 0 0' : '16px 0 24px 0'};
  text-align: center;
  align-self: center;
  line-height: 26px;
`;

export const StyledSubTitle = styled(StyledTitle)`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
`;

export const StyledText = styled.Text``;

export const StyledContainerButtons = styled.View<PropsContainerButtons>`
  width: 80%;
  flex-direction: ${({columnButtons}) =>
    columnButtons ? 'column-reverse' : 'row'};
  justify-content: space-between;
  align-self: center;
`;

const StyledCircle = styled.View`
  width: 100px;
  height: 100px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.SECUNDARY_500};
  border-radius: 50px;
`;

export const StyledCloseButton = styled(IconMaterial.Button)`
  margin-right: -10px;
  padding: 0;
`;

export const StyledCancelButton = styled(Button)``;

export const StyledConfirmButton = styled(Button)``;

export default Modal;
