import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnnouncement } from "../../features/secondarySlice";

export default function CreateAnnouncementForm() {
  const dispatch = useDispatch();

  const [payload, setPayload] = useState<any>({
    title: "",
    description: "",
    img: undefined
  });

  function updatePayload(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setPayload((pre: any) => ({
      ...pre,
      [el.id]: el.value,
    }));
  }
  function updateFilePayload(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setPayload((pre: any) => ({
      ...pre,
      img: (el.files as FileList)[0],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // @ts-ignore
    dispatch(createAnnouncement(payload));
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input value={payload.title} onChange={(e) => updatePayload(e)} id="title" type="text" placeholder="title" />
      <input value={payload.description} onChange={(e) => updatePayload(e)} id="description" type="text" placeholder="description" />
      <input onChange={(e) => updateFilePayload(e)} id="img" type="file" />
      <Button type="submit">Create Announcement</Button>
    </form>
  );
}
