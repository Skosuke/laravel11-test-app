import { CurrentUser, Room } from '@/types/user';
import { Link } from '@inertiajs/react';
import React from 'react';

type RoomItemProps = {
  room: Room;
  currentUser: CurrentUser;
  openModal: (roomId: number) => void;
};
const RoomItem: React.FC<RoomItemProps> = ({
  room,
  currentUser,
  openModal,
}) => {
  return (
    <div key={room.id} className="room-item">
      <h2 className="room-name">
        {room.name} (
        {room.user
          ? `Created by: ${room.user.name}`
          : 'Creator information not available'}
        )
      </h2>
      <div>
        <Link
          href={`/room/${room.id}`}
          method="post"
          className="join-button"
          as="button"
        >
          Join Room
        </Link>
        {room.user?.id === currentUser.id ? (
          <button onClick={() => openModal(room.id)} className="delete-button">
            DELETE
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RoomItem;
