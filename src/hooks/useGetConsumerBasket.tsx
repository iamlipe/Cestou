import {useEffect} from 'react';
import {useReduxDispatch} from './useReduxDispatch';
import {GET_CONSUMER_BASKET} from '@/store/slices/basketSlice';
import {useReduxSelector} from './useReduxSelector';

export const useGetConsumerBasket = () => {
  const dispatch = useReduxDispatch();
  const {canUpdateProducerBasket, basketConsumer} = useReduxSelector(
    state => state.basket,
  );

  useEffect(() => {
    if (canUpdateProducerBasket) {
      dispatch(GET_CONSUMER_BASKET());
    }
  }, [canUpdateProducerBasket, dispatch]);

  return {basketConsumer};
};
