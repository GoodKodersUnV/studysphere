import FriendsList from "./_components/FriendsList";

export default async function RootLayout({ children }) {

  return (
    <div className="flex w-full p-5">
      <div className="w-[20%]">
        <FriendsList  />
      </div>
      <div className="w-[80%]">{children}</div>
    </div>
  );
}
