import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import '../../css/create-button.css';
import CreateChatRoomModal from '../Pages/Rooms/setting'; // モーダルコンポーネントをインポート

const CreateChatRoomButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* モーダルウィンドウ */}
      {isModalOpen && <CreateChatRoomModal onClose={closeModal} />}

      {/* 固定ボタン */}
      <button
        className="icon-container"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={openModal}
      >
        <span className="icon-flare-text">+</span>
        <div className="icon-spark"></div>
      </button>
    </>
  );
};

export default CreateChatRoomButton;
