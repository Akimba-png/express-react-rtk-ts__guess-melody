import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './../store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
