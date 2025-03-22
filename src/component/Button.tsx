import { Button as AntdButton } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ReactNode } from "react";
import type { ButtonType } from "antd/es/button/buttonHelpers";

type ButtonTypes = 'create' | 'edit' | 'primary' | 'delete';

type ButtonProps = {
  label?: string;
  type?: ButtonTypes;
  subType?: ButtonType;
  onClick: () => void;
  children?: ReactNode;
}

const mapIcon: Partial<Record<ButtonTypes, ReactNode>> = {
  create: <PlusOutlined />,
  delete: <DeleteOutlined />,
}

const mapColor: Partial<Record<ButtonTypes, string | undefined>> = {
  delete: 'danger',
}

export function Button({ label, subType = 'primary', type = 'primary', onClick, children }: ButtonProps) {
  return <AntdButton color={mapColor[type]} type={subType} shape="round" icon={mapIcon[type]} onClick={onClick}>{label}{children}</AntdButton>;
}
