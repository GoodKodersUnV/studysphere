
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function updateTokens(token : number) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      "message" : "Unauthorized"
    }
  }


  if(token === parseInt(process.env.PRO_SECRET!)){
    const currentDate = new Date();
   const updatedEndTime = new Date(currentDate.getTime() + (28 * 24 * 60 * 60 * 1000));
    const updatedUser = await db.user.update({
      where:{
        id: currentUser.id
      },
      data:{
        plan:{
          create:{
            duration:"monthly",
            endTime:updatedEndTime,
          }
        }
      }
    }
    )
    return updatedUser;
  }


  const currtokens = currentUser?.tokens ?? 0 
  const updatedTokens = (currtokens + token)
  const updatedUser = await db.user.update({where:{id:currentUser?.id},data:{tokens:updatedTokens}})
  
  return updatedUser;
}
