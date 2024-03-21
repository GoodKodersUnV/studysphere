import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

const SigninWithGoogle = () => {
  const router = useRouter();
  const loginWithGoogle = async () => {
    const response = await signIn('google', { callbackUrl: '/' });
    // console.log(response);
    if (response?.ok) {
      // console.log(response);
      toast.success('Signin successful');
      router.push('/');
    }
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <div>
      {/* <hr className="my-5" /> */}
      <h2 className="text-center my-2">Or</h2>

      <button onClick={(e) => { e.preventDefault(); loginWithGoogle() }} className='bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg w-full  '>
        <div className='flex justify-center items-center gap-5 relative'>

          <div
          // className='absolute left-5'
          >
            <FcGoogle />

          </div>
          Continue with Google
        </div>
      </button>
    </div>
  );
};

export default SigninWithGoogle;
