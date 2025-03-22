import { ReactNode } from 'react';
import { usePermissionCheck } from '../hooks/usePermissionAccess';

type PermissionAccessProps = {
  permission: string;
  children: ReactNode;
  noAccecss?: ReactNode;
}

export function AccessByPersmission({ children, permission, noAccecss }: PermissionAccessProps) {
  const hasAccess = usePermissionCheck(permission);

  if (!hasAccess) {
    return <>{noAccecss}</>;
  }

  return <>{children}</>;
}