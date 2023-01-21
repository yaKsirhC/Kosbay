import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import '../../styles/announcements.scss'
import MinifiedAnnouncement from './MinifiedAnnouncement';

export default function MinifiedAnnouncements() {
  const {announcements} = useSelector((state: RootState) => state.secondary)


  return <div className=" minified_announcements">
    {
      announcements.map((ann, i) => {
        return <MinifiedAnnouncement key={i} announcement={ann} />
      })

    }
  </div>;
}
