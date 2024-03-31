import getCurrentUser from '@/actions/getCurrentUser'
import StudentTable from './StudentTable';

const page = async ({params}) => {
  const currentUser = await getCurrentUser();
  return (
    <StudentTable currentUser={currentUser} params={params}/>
  )
}

export default page