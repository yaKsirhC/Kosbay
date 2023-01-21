import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import '../../styles/chatRoom.scss'
import Contact from './Contact'

export default function Contacts() {
  const {contacts} = useSelector((state: RootState) => state.chat)
  return (
    <div className='contacts'>
      {
        contacts.map((contact, i) => {
          return <Contact key={i} contact={contact} />
        })
      }
    </div>
  )
}
