import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className=' overflow-x-hidden'>
    {children}
  </div>
};

export default ProtectedLayout;
