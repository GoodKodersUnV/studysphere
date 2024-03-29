"use client"

import axios from "axios"
import { FaRegCheckCircle } from "react-icons/fa"

const NotificationModal = ({ notifications, setNotifications }) => {

  /**
   * [{"id":"6606e9e5de9c0f52f94e0326","message":"production -test notification","userId":"65fe6222ddcb5a32295af03e","readAt":null,"deletedAt":null,"createdAt":"2024-03-29T16:18:45.496Z","updatedAt":"2024-03-29T16:18:20.122Z"}]
   */

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await axios.post('/api/update-notification', { notificationId })
      if (res.status === 200) {
        setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const handleClear = async () => {
    try {
      const res = await axios.post('/api/clear-notifications')
      if (res.status === 200) {
        setNotifications([])
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString()
  }

  return (
    <div className='z-50 w-80 h-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4'>
      <h1 className='text-2xl font-bold'>Notifications</h1>
      <div className='h-56 overflow-y-auto'>
        <div className='flex flex-col items-center gap-2'>
          {notifications.map((notification) => (
            <div key={notification.id} className='w-full flex flex-col bg-gray-100 p-2 rounded-lg'>
              <div className="flex">
                <p className="w-[500px] ">
                  {notification.message}
                </p>
                <button className='bg-green-200 font-semibold text-gray-800 rounded-lg p-2 w-[33px]' onClick={()=>handleMarkAsRead(notification.id)}>
                  <FaRegCheckCircle />
                </button>
              </div>
              <p className="text-gray-500 text-sm">{formatDateTime(notification.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
      <button className='w-full bg-orange-200 font-semibold text-gray-800 rounded-lg p-2' onClick={handleClear}>Clear All</button>
    </div>
  )
}

export default NotificationModal