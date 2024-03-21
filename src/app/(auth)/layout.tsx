import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='flex h-screen w-full justify-center items-center '>
    <div className='p-7 m-2 md:p-10 sm:w-[400px] bg-slate-200 rounded-lg shadow-lg'>
      {children}
    </div>
  </div>;
};

export default AuthLayout;
