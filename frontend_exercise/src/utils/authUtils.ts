import { store } from '../store';

export const getAuthHeader = () => {
  const state = store.getState();
  const token = state.auth.jwtToken;

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
