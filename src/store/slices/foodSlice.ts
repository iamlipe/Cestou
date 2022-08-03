import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface FoodBasketResponse {
  id: string;
  quantity: number;
  foodID: {
    id: string;
    name: string;
    imageUrl: string;
    priceWeight: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface FoodBasketRequest {
  id: string;
}

interface FoodState {
  isLoading: boolean;
  error: AxiosError | null;
  statusCode: number | null;

  allFoods: FoodBasketResponse[] | null;
  foodsBasket: FoodBasketResponse[] | null;
}

const initialState: FoodState = {
  isLoading: false,
  error: null,
  statusCode: null,

  allFoods: null,
  foodsBasket: null,
};

const foodSlice = createSlice({
  name: 'foood',
  initialState,
  reducers: {
    GET_FOODS_BASKET: (state, _: PayloadAction<FoodBasketRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
    }),
    GET_FOODS_BASKET_SUCCESS: (
      state,
      {
        payload: {data, status},
      }: PayloadAction<{data: FoodBasketResponse[]; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      statusCode: status,

      foodsBasket: data,
    }),
    GET_FOODS_BASKET_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),
  },
});

const {actions, reducer} = foodSlice;

export const foodState = initialState;

export const {
  GET_FOODS_BASKET,
  GET_FOODS_BASKET_SUCCESS,
  GET_FOODS_BASKET_FAILURE,
} = actions;

export default reducer;
