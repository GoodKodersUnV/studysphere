import getFirends from "@/actions/getFriends";
import FriendsList from "./FriendsList";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const friends = await getFirends();
  const currentUser = await getCurrentUser();

  return (
    <div className="flex w-full p-5">
      <div className="w-[20%]">
        <FriendsList friends={friends} currentUser={currentUser} />
      </div>
      <div className="w-[80%]">
      {children}
      </div>
    </div>
  )
}
