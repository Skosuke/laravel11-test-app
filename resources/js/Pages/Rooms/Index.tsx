import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import '../../../css/rooms.css';
import CreateChatRoomButton from '@/Components/CreateChatRoomButton';
import Header from '@/Components/Header';
import { CurrentUser, Room } from '@/types/user';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';

type RoomListProps = {
  rooms: Room[];
  currentUser: CurrentUser; // ログインユーザー情報
};

const RoomList: React.FC<RoomListProps> = ({ rooms, currentUser }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setselectedRoomId] = useState<number | null>(null);

  const openModal = (roomId: number) => {
    console.log(`open modal roomid is ${roomId}`);
    setselectedRoomId(roomId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setselectedRoomId(null);
  };

  const handleDelete = () => {
    if (selectedRoomId != null) {
      console.log(`Room ${selectedRoomId} deleted`);
      // DELETEリクエストを送信
      router.delete(`/room/delete/${selectedRoomId}`);
      closeModal();
    }
  };

  return (
    <div className="rooms-container">
      <Header currentUser={currentUser} />

      <div className="rooms-list">
        {rooms.length > 0 ? (
          rooms.map((room) => (
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
                  <button
                    onClick={() => openModal(room.id)}
                    className="delete-button"
                  >
                    DELETE
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-rooms-message">No rooms available.</p>
        )}
      </div>
      <CreateChatRoomButton />
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RoomList;
