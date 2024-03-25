import getCurrentUser from '@/actions/getCurrentUser';
import { db } from '@/libs/db';
import React from 'react'
import Message from './Message'
import Messages from './Messages'


const page = async ({ params }) => {

  const currentUser = await getCurrentUser();

  // const messageData = await db.friend.findFirst({
  //   where: {
  //     friendUserId: params.id,
  //     userId: currentUser.id,
  //   },
  //   include: {
  //     friendUser: true,
  //   }
  // });

const messageData = [
{
  'id': "65fe7164ddcb5a32295af048",
  'userId': "65fe6321a24cc36f4540852a",
  'friendUserId': "65fe63afc08b5dee1ba72d03",
  'messages': [
    {
      "message" : "Hello",
      "sender": {
        "id": "65fe63afc08b5dee1ba72d03",
        "name": "Kalyan Tingani",
        "username": "kalyan",
        "email": "kalyantingani@gmail.com",
        "image": "https://images.pexels.com/photos/2825749/pexels-photo-2825749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "role": "user"
      },
      "receiver": {
        "id": "65fe6321a24cc36f4540852a",
        "name": "Vighnesh Vangari",
        "username": "vighnesh",
        "email": "vangarivighnesh@gmail.com",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocKGWSg2Mt1jXu-Ax5F4inYHYnkZwhg7_HWIkrHu7yq-hGU=s96-c",
        "role": "owner"
      },
      "createdAt": "2020-09-17T12:00:00.000Z"
    },
    {
      "message" : "Hi",
      "sender": {
        "id": "65fe6321a24cc36f4540852a",
        "name": "Vighnesh Vangari",
        "username": "vighnesh",
        "email": "vangarivighnesh@gmail.com",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocKGWSg2Mt1jXu-Ax5F4inYHYnkZwhg7_HWIkrHu7yq-hGU=s96-c",
        "role": "owner"
      },
      "receiver": {
        "id": "65fe63afc08b5dee1ba72d03",
        "name": "Kalyan Tingani",
        "username": "kalyan",
        "email": "kalyantingani@gmail.com",
        "image": "https://images.pexels.com/photos/2825749/pexels-photo-2825749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "role": "user"
      },
      "createdAt": "2020-09-17T12:00:00.000Z"
    },
  {
    "message": "How are you?",
    "sender": {
      "id": "65fe63afc08b5dee1ba72d03",
      "name": "Kalyan Tingani",
      "username": "kalyan",
      "email": "kalyantingani@gmail.com",
      "image": "https://images.pexels.com/photos/2825749/pexels-photo-2825749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "role": "user"
    },
    "receiver": {
      "id": "65fe6321a24cc36f4540852a",
      "name": "Vighnesh Vangari",
      "username": "vighnesh",
      "email": "vangarivighnesh@gmail.com",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocKGWSg2Mt1jXu-Ax5F4inYHYnkZwhg7_HWIkrHu7yq-hGU=s96-c",
      "role": "owner"
    },
    "createdAt": "2020-09-17T12:00:00.000Z"
  },
  {
    "message": "I'm doing well, thanks!\nWhat about you",
    "sender": {
      "id": "65fe6321a24cc36f4540852a",
      "name": "Vighnesh Vangari",
      "username": "vighnesh",
      "email": "vangarivighnesh@gmail.com",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocKGWSg2Mt1jXu-Ax5F4inYHYnkZwhg7_HWIkrHu7yq-hGU=s96-c",
      "role": "owner"
    },
    "receiver": {
      "id": "65fe63afc08b5dee1ba72d03",
      "name": "Kalyan Tingani",
      "username": "kalyan",
      "email": "kalyantingani@gmail.com",
      "image": "https://images.pexels.com/photos/2825749/pexels-photo-2825749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "role":"user"
    },
    "createdAt": "2020-09-17T12:00:00.000Z"
    }
  ]
}
];

  return (
    <div>
      <h1>Message</h1>
      <p>Message ID: {params.id}</p>
      {/* <p className='mb-24'>Message Data: {JSON.stringify(messageData)}</p> */}
      <div className=' outline min-h-[450px] px-3 flex flex-col justify-between outline-gray-400 outline-1 bg-zinc-50 pb-5'>
        <Messages userId={messageData[0].userId} messages={messageData[0].messages}/>
        <Message messageData={messageData[0].messages} />
      </div>
    </div>
  )
}

export default page