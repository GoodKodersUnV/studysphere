
import getCurrentUser from '@/actions/getCurrentUser'
import EditProfile from '@/components/EditProfile'

export default async function() {
    const currentUser = await getCurrentUser();
    return (
        <div>
            <EditProfile currentUser={currentUser} />
        </div>
    )
}