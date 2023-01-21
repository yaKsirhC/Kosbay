import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "../../styles/announcements.scss";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import RegularAnnouncement from "./RegularAnnouncement";

export default function AnnouncementsHistory() {
  const { announcements } = useSelector((state: RootState) => state.secondary);
  const { isSuper } = useSelector((state: RootState) => state.auth);

  return (
    <div className="announcement_history">
      {isSuper && <CreateAnnouncementForm />}
      <div className="regular_announcements">
        {announcements.map((ann, i) => {
          return <RegularAnnouncement announcement={ann} key={i} />;
        })}
      </div>
    </div>
  );
}
