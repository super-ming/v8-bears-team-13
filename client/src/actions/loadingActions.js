import { LOADING_START, LOADING_STOP } from './types';

export const startLoading = () => ({
  type: LOADING_START
});

export const stopLoading = () => ({
  type: LOADING_STOP
});
