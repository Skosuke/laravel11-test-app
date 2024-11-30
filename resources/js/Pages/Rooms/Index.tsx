import React, { useEffect, useState } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import '../../../css/rooms.css';
import CreateChatRoomButton from '@/Components/CreateChatRoomButton';
import Header from '@/Components/Header';
import { CurrentUser, Room } from '@/types/user';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
import SearchIcon from '@/Components/SearchIcon';
import SearchBar from '@/Components/SearchBar';

type RoomListProps = {
  rooms: Room[];
  currentUser: CurrentUser; // ログインユーザー情報
};

const RoomList: React.FC<RoomListProps> = ({ rooms, currentUser }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setselectedRoomId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);

  const openModal = (roomId: number) => {
    console.log(`open modal roomid is ${roomId}`);
    setselectedRoomId(roomId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setselectedRoomId(null);
  };

  const handleDelete = async () => {
    if (selectedRoomId != null) {
      try {
        const response = await axios.delete(`/room/delete/${selectedRoomId}`);

        console.log(
          `Room ${selectedRoomId} deleted successfully`,
          response.data
        );

        // 削除後のリスト更新
        setFilteredRooms(
          filteredRooms.filter((room) => room.id !== selectedRoomId)
        );

        closeModal();
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  // 部屋リストの検索処理
  useEffect(() => {
    const fetchFilteredRooms = async () => {
      if (searchQuery.trim() === '') {
        setFilteredRooms(rooms); // クエリが空の場合は元のリストを表示
        return;
      }
      try {
        const response = await axios.get<{ rooms: Room[] }>(
          '/api/rooms/search',
          {
            params: { name: searchQuery }, // クエリパラメータを指定
          }
        );
        setFilteredRooms(response.data.rooms); // 検索結果をステートに反映
      } catch (error) {
        console.error('Error fetching filtered rooms:', error);
      }
    };

    const debounceFetch = setTimeout(fetchFilteredRooms, 300); // デバウンス
    return () => clearTimeout(debounceFetch); // 前回のタイマーをクリア
  }, [searchQuery, rooms]); // 検索クエリや部屋リストが変化したら再実行

  return (
    <div className="rooms-container">
      <Header currentUser={currentUser} />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setSearchOpen={setSearchOpen}
      />
      <div className="rooms-list">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
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
