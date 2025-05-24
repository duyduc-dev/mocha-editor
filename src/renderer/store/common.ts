import {
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
} from '@reduxjs/toolkit';
import { IAppState } from '@renderer/store/index';
import { EqualityFn, useDispatch, useSelector } from 'react-redux';
import { IAppServices } from '@renderer/services';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IAppState,
  IAppServices,
  UnknownAction
>;

export type AppDispatch = ThunkDispatch<IAppState, IAppServices, UnknownAction>;

export type ActionStatus = 'Init' | 'Pending' | 'Success' | 'Error';

export interface IBaseState {
  status: ActionStatus;
  error?: IError;
}

export interface IError {
  type: string;
  title?: string;
  message?: string;
  [key: string]: any;
}

type Undefined<T> = { [key in keyof T]?: undefined };

export type ActionState<TInput = object, TResult = object, TError = IError> =
  | ({ status: 'Init' } & Undefined<TInput> &
      Undefined<TResult> & { error?: undefined })
  | ({ status: 'Pending' } & TInput &
      Undefined<TResult> & { error?: undefined })
  | ({ status: 'Success' } & TInput & TResult & { error?: undefined })
  | ({ status: 'Error' } & TInput & Undefined<TResult> & { error: TError });

export type SeamlessActionState<
  TInput = object,
  TResult = object,
  TError = IError,
> =
  | ({ status: 'Init' } & Undefined<TInput> &
      Undefined<TResult> & { error?: undefined })
  | ({ status: 'Pending' } & TInput & Partial<TResult> & { error?: undefined })
  | ({ status: 'Success' } & TInput & TResult & { error?: undefined })
  | ({ status: 'Error' } & TInput & Undefined<TResult> & { error: TError });

export type ThunkConfig = {
  state: IAppState;
  extra: IAppServices;
  dispatch: AppDispatch;
};

export type ThunkPayloadCreator<
  R = unknown,
  A = void,
> = AsyncThunkPayloadCreator<R, A, ThunkConfig>;

export const createAppAsyncThunk = <R = unknown, A = void>(
  typePrefix: string,
  payloadCreator: ThunkPayloadCreator<R, A>,
  options?: AsyncThunkOptions<A, ThunkConfig>,
) => createAsyncThunk(typePrefix, payloadCreator, options);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <R = IAppState>(
  state: (state: IAppState) => R = (s) => s as unknown as R,
  equalityFnOrOptions?: EqualityFn<R>,
) => useSelector<IAppState, R>(state, equalityFnOrOptions);
