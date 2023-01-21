import { announcement } from "../../vite-env";
import ServerImage from "../ServerImage";

export default function RegularAnnouncement({ announcement }: { announcement: announcement }) {
  return (
    <div className="announcement_wrapper">
      <div className="announcements">
        <h2>{announcement.Title}</h2>
        <h3>{announcement.Description}</h3>
        <ServerImage path={announcement.Img} />
      </div>
    </div>
  );
}
