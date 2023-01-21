/// <reference types="vite/client" />

import { Socket } from "socket.io-client";

export interface authState {
  isLoading: boolean;
  auth: string;
  authBox: string;
}

export interface secondaryState {
  questions: [];
  replies: addressedReply[];
  events: event[];
  isLoading: boolean;
  announcements: announcement[];
}

export interface productState {
  products: product[];
  isLoading: boolean;
  viewedProduct: any;
  filters: any
  createProduct: boolean
}
export interface userState {
  isLoading: boolean;
  userInfo: user | {};
}
export interface chatState {
  isLoading: boolean;
  conversationContact?: user;
  messages: any[];
  contacts: [];
  socket?: Socket;
  showInlineBox: boolean;
}

export interface addressedReply {
  replies: reply[];
  qid: string;
}

export interface question {
  From: string;
  Title: string;
  Description: string;
  Categories: [string];
  QuestionedAt: number;
  Replies: [string];
  Resolved: boolean;
  _id: string;
}

export interface reply {
  _id: string;
  From: string;
  Content: string;
  RepliedAt: number;
  _qid: string;
}
export interface event {
  DatePosted: number;
  CompletionDate: number;
  Title: string;
  Description: string;
  _uid: string;
}
export interface announcement {
  Img: string;
  Title: string;
  Description: string;
  _uid: string;
  AnnouncedAt: number;
}
export interface product {
  CreatedAt: number;
  Title: string;
  Description: string;
  Imgs: [string];
  Price: number;
  Categories: [string];
  Owner: user;
  Sold: boolean;
  _id: string;
}

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

export interface message {
  Transmitter: string;
  Recipient: string;
  Content: string;
  SentAt: number;
  _id: string;
  Type: string;
}
