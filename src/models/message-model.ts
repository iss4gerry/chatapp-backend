export interface MessagePayload {
	roomId: string;
	senderId: string;
	receiverId: string;
	content: string;
	dateTime: string;
}

export type RoomPayload = {
	roomId: string;
	user1Id: string;
	user2Id: string;
};

export type GetRoom = {
	roomId: string;
};

export type RoomResponse = {
	id: string;
	user1Id: string;
	user2Id: string;
	createdAt: Date;
};
