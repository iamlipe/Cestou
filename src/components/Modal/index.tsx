import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {ModalProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import Button from '@/components/Button';

interface Props extends ModalProps {
  title?: string;
  icon?: React.FC<SvgProps>;
  onPress?: () => void;
}

const Modal = ({title, icon: Icon, onPress, ...rest}: Props) => {
  const {goBack} = useNavigation();

  return (
    <GestureHandlerRootView>
      <StyledModal animationType="fade" transparent {...rest}>
        <StyledBackgroundModal>
          <StyledContent>
            {Icon && (
              <StyledCircle>
                <Icon width={60} height={60} />
              </StyledCircle>
            )}
            {title && <StyledTitle>{title}</StyledTitle>}

            {onPress && (
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
                  onPress={() => {
                    onPress();
                    goBack();
                  }}
                />
              </StyledContainerButtons>
            )}
          </StyledContent>
        </StyledBackgroundModal>
      </StyledModal>
    </GestureHandlerRootView>
  );
};

const StyledModal = styled.Modal``;

const StyledBackgroundModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.BACKGROUND_MODAL};
`;

const StyledContent = styled.View`
  width: 80%;
  align-items: center;
  padding: 16px 32px;
  border-radius: 4px;
  background-color: ${({theme: {colors}}) => colors.BACKGROUND};
`;

const StyledTitle = styled.Text`
  margin: 16px 0 24px 0;
  text-align: center;
  line-height: 26px;
`;

const StyledContainerButtons = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCircle = styled.View`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.SECUNDARY_500};
  border-radius: 50px;
`;

const StyledCancelButton = styled(Button)``;

const StyledConfirmButton = styled(Button)``;

export default Modal;
