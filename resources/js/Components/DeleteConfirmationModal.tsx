import React from 'react';
import '../../css/delete-modal.css';

type DeleteConfirmationModalProps = {
  isOpen: boolean; // モーダルが開いているかどうか
  onClose: () => void; // モーダルを閉じる関数
  onDelete: () => void; // 削除処理を実行する関数
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <p>Are you sure you want to delete this room?</p>
        <div className="delete-modal-actions">
          <button onClick={onDelete} className="confirm-button">
            Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
