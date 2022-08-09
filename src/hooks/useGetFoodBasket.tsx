import {useEffect} from 'react';
import {GET_FOODS_BASKET} from '@/store/slices/foodSlice';
import {useReduxSelector} from './useReduxSelector';
import {useReduxDispatch} from './useReduxDispatch';
import {useIsFocused} from '@react-navigation/native';

export const useGetFoodBasket = () => {
  const {basketProducer} = useReduxSelector(state => state.basket);
  const {foodsBasket} = useReduxSelector(state => state.food);
  const dispatch = useReduxDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (basketProducer && isFocused) {
      dispatch(GET_FOODS_BASKET({id: basketProducer?.basket_id}));
    }
  }, [basketProducer, dispatch, isFocused]);

  return {foodsBasket};
};
