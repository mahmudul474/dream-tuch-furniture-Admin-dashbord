import React from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirmationModal = ({ isVisible, entity, onCancel, onConfirm }) => {
  return (
    <Modal
      title={`Confirm Delete ${entity}`}
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="danger" onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this {entity.toLowerCase()}?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
