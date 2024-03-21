import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div>
    {children}
  </div>
};

export default ProtectedLayout;
