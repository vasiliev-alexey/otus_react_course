import React from 'react';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import authReducer from './authReducer';
import { Action, ContextHook, AuthState } from './types';

// Initial State
const initialState: AuthState = {
  isAuth: false,
  userName: '',
  userPictUrl: '',
};

// Create Our context
const authContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

// Provider to wrap around our root react component
export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactNode => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// Custom context hook
export const useAuthContext: ContextHook = () => {
  const { state, dispatch } = useContext(authContext);
  return { authState: state, dispatch };
};
