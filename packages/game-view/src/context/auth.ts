import * as React from 'react';
type AuthContext = {
  userName: string;
  setName?: (name: string) => void;
};

// Create a context wrapping some shared state
export default React.createContext<AuthContext>({
  userName: 'aa',
});
