import { ReactNode, useState } from 'react';
import { Button, Modal } from 'antd';

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  handleOk: () => void;
}

export function ModalWindow({ title, children, open, handleOk }: ModalWindowProps) {
  return (
    <>
      <Modal title={title} open={open} onOk={handleOk} onClose={handleOk}
        footer={[<Button type="primary" onClick={handleOk}>
          OK
        </Button>]}>
        {children}
      </Modal>
    </>
  );
};
