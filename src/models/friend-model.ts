import { User } from "@prisma/client";

export type FriendRequest = {
  userId: string;
  friendId: string;
};

export type Response = {
  id: string;
  userId: string;
  friendId: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AccRequest = {
  id: string;
};

export type SearchFriend = {
  id: string;
  username: string;
  name: string;
  email: string;
};

export function toUserResponse(user: User): SearchFriend {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email!,
  };
}
