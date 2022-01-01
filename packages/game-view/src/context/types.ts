export interface AuthState {
  isAuth: boolean;
  userName: string;
  userPictUrl: string;
}

//type ActionTypes = 'SET_USER_NAME';

export interface SetUserNameAction {
  type: 'SET_USER_NAME';
  payload: { userName: string; userPictUrl: string; uid: string };
}
export interface LogOutAction {
  type: 'LOGOUT';
}

export type Action = SetUserNameAction | LogOutAction;

export type ContextHook = () => {
  authState: AuthState;
  dispatch: (action: Action) => void;
};
export type ReducerType = (state: AuthState, action: Action) => AuthState;
