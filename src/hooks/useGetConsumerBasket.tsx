import {useEffect} from 'react';
import {useReduxDispatch} from './useReduxDispatch';
import {GET_CONSUMER_BASKET} from '@/store/slices/consumerSlice';
import {useReduxSelector} from './useReduxSelector';

export const useGetConsumerBasket = () => {
  const dispatch = useReduxDispatch();
  const {consumerBasket} = useReduxSelector(state => state.consumer);

  useEffect(() => {
    if (!consumerBasket) {
      dispatch(GET_CONSUMER_BASKET());
    }
  }, [consumerBasket, dispatch]);

  return consumerBasket;
};
