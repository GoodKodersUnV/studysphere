import getCurrentUser from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation';
import UserDetails from '@/components/UserDetails';

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/signin');
  }
  const access = currentUser?.role == 'admin' || currentUser?.role == 'owner'
  if (!access) {
    redirect('/');
    return <div>Unauthorized</div>
  }
  if (access) {
    return <UserDetails role={currentUser.role} />
  }
  return (
    <div>something went wrong</div>
  )
}

export default page