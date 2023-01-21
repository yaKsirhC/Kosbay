import React from "react";
import { announcement } from "../../vite-env";

export default function MinifiedAnnouncement({ announcement }: { announcement: announcement }) {
  return (
    <div className="minified_announcement">
      <h3>{announcement.Title}</h3>
      <p>{announcement.Description}</p>
    </div>
  );
}
