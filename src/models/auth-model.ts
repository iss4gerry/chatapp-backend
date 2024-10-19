import { User } from "@prisma/client";

export type RegisterRequest = {
  email: string;
  avatar: number;
  username: string;
  name: string;
  password: string;
};

export type Response = {
  id: string;
  avatar?: number;
  username: string;
  name: string;
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export function toUserResponse(user: User): Response {
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    username: user.username,
    email: user.email!,
  };
}
