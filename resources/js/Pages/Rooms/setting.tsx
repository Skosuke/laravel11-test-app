import React from 'react';
import { useForm } from '@inertiajs/react';
import '../../../css/modal.css'; // 必要に応じてスタイルを追加

type CreateChatRoomModalProps = {
  onClose: () => void; // モーダルを閉じるための関数
};

const CreateChatRoomModal: React.FC<CreateChatRoomModalProps> = ({
  onClose,
}) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(route('room.create'));
    post(route('room.create'), {
      onSuccess: () => onClose(), // 成功時にモーダルを閉じる
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">
          close
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="roomName"
            name="roomName"
            placeholder="set room name"
            value={data.name}
            onChange={(e) => {
              setData('name', e.target.value);
            }}
            required
          />
          <button type="submit" className="modal-create-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChatRoomModal;
