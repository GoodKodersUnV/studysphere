import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="flex">
    <div className="w-[50vw]">
      <img className="w-full h-screen" src="https://i.postimg.cc/XqypKSM9/Black-White-Modern-Quiz-Time-Instagram-Post.png" alt="" />
    </div>
    <div className='flex h-screen w-[50vw] justify-center items-center '>
      <div className='p-7 m-2 md:p-10 sm:w-[400px] rounded-2xl shadow-lg bg-slate-200 '>
        {children}
      </div>
    </div>
  </div>;
};

export default AuthLayout;
