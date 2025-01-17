import { IChat } from "./IChat";
import { IUser } from "./IUser";

export interface IMessage {
  chat: IChat;
  content: string;
  readBy: IUser[];
  sender: IUser;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}
