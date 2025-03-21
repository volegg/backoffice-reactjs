import { ReactNode, useState } from 'react';
import { Button, Modal } from 'antd';

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  handleOk: () => void;
  onClose?: () => void;
  withFooter?: boolean;
}

export function ModalWindow({ title, children, open, handleOk, onClose, withFooter = true }: ModalWindowProps) {
  return (
    <>
      <Modal title={title} open={open} onOk={handleOk} onClose={onClose ? onClose : handleOk} onCancel={onClose}
        footer={withFooter ? [<Button type="primary" onClick={handleOk}>
          OK
        </Button>] : []}>
        {children}
      </Modal>
    </>
  );
};
