import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getContacts } from '../features/chatSlice'
import ChatRoomAPI from '../components/chat/ChatRoomAPI'
import Contacts from '../components/chat/Contacts'
import '../styles/chatRoom.scss'

export default function ChatRoom() {
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(getContacts())
  },[])

  return (
    <div className='chat_grid'>
      <h1>
        Chat Room
      </h1>
      <Contacts />
      <ChatRoomAPI />
      <div className="chat_ads">
      </div>
    </div>
  )
}
