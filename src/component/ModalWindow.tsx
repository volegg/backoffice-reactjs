import type { ReactNode } from 'react';
import { Modal } from 'antd';
import { Button } from './Button';

export type ModalWindowProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onOk?: () => void;
  close: () => void;
  okLable?: string;
  removeOkButton?: boolean;
  cancelButton?: { label?: string; }
}

export function ModalWindow({ title, children, open, onOk, close, cancelButton, okLable = 'OK', removeOkButton = false }: ModalWindowProps) {
  return <Modal title={title} open={open} onOk={modalOk} onClose={modalClose} onCancel={modalClose}
    footer={<>
      {removeOkButton ? null : <Button onClick={modalOk}>{okLable}</Button>}
      {cancelButton ? <Button onClick={modalClose}>{cancelButton.label}</Button> : null}
    </>}>
    {children}
  </ Modal >;

  function modalOk() {
    if (onOk) {
      onOk();
    }

    close();
  }

  function modalClose() {
    close();
  }
};
