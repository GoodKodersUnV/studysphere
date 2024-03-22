import getCurrentUser from "@/actions/getCurrentUser";

import Friends from "./Friends";

export default async function () {
  const currentUser = await getCurrentUser();
  return <Friends currentUser={currentUser} />;
}
