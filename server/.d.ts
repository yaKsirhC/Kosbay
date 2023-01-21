export interface user {
  joinedAt: number;
  IsSuper: boolean;
  Name: string;
  Email: string;
  Password: string;
  ImgBanner: string;
  Followers: [string];
  Followed: [string];
  Conversations: [string];
  Products: [string];
  Announcements: [string];
  Events: [string];
  _id: string;
}
