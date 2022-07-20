import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/types/store';

export const useReduxDispatch = () => useDispatch<AppDispatch>();
