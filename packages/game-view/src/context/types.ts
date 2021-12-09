export interface AuthState {
  isAuth: boolean;
  userName: string;
}

type ActionTypes = 'SET_USER_NAME';
export interface Action {
  type: ActionTypes;
  payload?: unknown;
}

export type ContextHook = () => {
  authState: AuthState;
  dispatch: (action: Action) => void;
};
export type ReducerType = (state: AuthState, action: Action) => AuthState;
