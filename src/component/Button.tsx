import { Button as AntdButton } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import type { ButtonColorType, ButtonHTMLType, ButtonType, ButtonVariantType } from 'antd/es/button/buttonHelpers';

type ButtonTypes = 'create' | 'edit' | 'delete' | 'cancel' | 'save' | 'default';

type ButtonProps = {
  label?: string;
  type?: ButtonTypes;
  onClick?: () => void;
  children?: ReactNode;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  variant?: ButtonVariantType;
}

const mapIcon: Partial<Record<ButtonTypes, ReactNode>> = {
  edit: <EditOutlined />,
  create: <PlusOutlined />,
  delete: <DeleteOutlined />,
}

const mapColor: Partial<Record<ButtonTypes, ButtonColorType>> = {
  delete: 'danger',
}

const mapVariant: Partial<Record<ButtonTypes, ButtonVariantType>> = {
  cancel: 'outlined',
}

export function Button({
  htmlType = 'button',
  label,
  type = 'default',
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  return <AntdButton
    htmlType={htmlType}
    color={mapColor[type] ?? 'primary'}
    variant={mapVariant[type] ?? 'solid'}
    shape="round"
    icon={mapIcon[type]}
    onClick={onClick}
    disabled={disabled}
  >{
      label}{children}
  </AntdButton>;
}
