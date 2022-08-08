import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {ModalProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import Button from '@/components/Button';

interface PropsTitle {
  justMessage: boolean;
  withSubtitle: boolean;
}

interface Props extends ModalProps {
  title?: string;
  subTitle?: string;
  icon?: React.FC<SvgProps>;
  onPress?: () => void;
  justMessage?: boolean;
}

const Modal = ({
  title,
  subTitle,
  icon: Icon,
  onPress,
  justMessage = false,
  ...rest
}: Props) => {
  const {goBack} = useNavigation();
  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <StyledModal animationType="fade" transparent {...rest}>
        <StyledBackgroundModal>
          <StyledContent>
            {onPress && (
              <StyledCloseButton
                name="close"
                size={20}
                color={theme.colors.GRAY_900}
                backgroundColor={theme.colors.BACKGROUND}
                onPress={() => {
                  onPress();
                  goBack();
                }}
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

            {!justMessage && onPress && (
              <StyledContainerButtons>
                <StyledCancelButton
                  buttonColor="text_only"
                  textColor="primary"
                  size="medium"
                  title="Cancelar"
                  onPress={onPress}
                />

                <StyledConfirmButton
                  size="medium"
                  title="Confirmar"
                  onPress={onPress}
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

export const StyledContainerButtons = styled.View`
  width: 80%;
  flex-direction: row;
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
