import { Dispatch, SetStateAction, createContext } from 'react';

import { TUser } from '../types/context/types';

const GlobalContext = createContext({
  user: {} as TUser,
  setUser: {} as Dispatch<SetStateAction<TUser>>,
});

export default GlobalContext;
