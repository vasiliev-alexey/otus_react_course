import { Action, AuthState } from './types';
import { doSignOut } from '../api/auth';

type ReducerType = (state: AuthState, action: Action) => AuthState;
const authReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case 'LOGOUT':
      doSignOut();
      return { userName: '', isAuth: false, userPictUrl: '' };

    case 'SET_USER_NAME':
      const { userName, userPictUrl, uid } = action.payload;

      return {
        ...state,
        isAuth: true,
        userName,
        userPictUrl,
        uid,
      };

    default:
      return state;
  }
};

export default authReducer;
