import { Action, AuthState } from './types';

type ReducerType = (state: AuthState, action: Action) => AuthState;
const authReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, isAuth: true, userName: action.payload };

    default:
      return state;
  }
};

export default authReducer;
