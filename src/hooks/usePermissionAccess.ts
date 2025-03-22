import { useEffect, useState } from 'react';
import { useSelector } from '../store/hooks';
import { selectLoggedUser } from '../store/user/selectors';

export function usePermissionCheck(expectedPermission) {
  const [hasAccess, setHasAccess] = useState(false);
  const user = useSelector(selectLoggedUser);

  useEffect(() => {
    if (user && user.permissions.length) {
      setHasAccess(user.permissions.map((p) => p.toLowerCase()).includes(expectedPermission.toLowerCase()));
    } else {
      setHasAccess(false);
    }
  }, [expectedPermission, user]);

  return hasAccess;
}
