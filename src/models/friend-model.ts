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
