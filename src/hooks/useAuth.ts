import { useContext } from 'react';
import GlobalContext from '@app/context';
const useAuth = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
