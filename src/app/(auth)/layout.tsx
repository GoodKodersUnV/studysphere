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
      <div className='relative'>
          <div className="circle circle-one opacity-80"></div>
          <div className='p-7 m-2 md:p-10 sm:w-[400px] rounded-2xl shadow-lg  backdrop-blur-xl  z-99'>
            {children}
          </div>
          <div className="circle circle-two opacity-80"></div>
      </div>
    </div>
  </div>;
};

export default AuthLayout;
