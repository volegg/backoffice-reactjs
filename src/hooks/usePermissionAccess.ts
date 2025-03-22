import { useEffect, useState } from 'react';
import { useSelector } from '../store/hooks';
import { selectLoggedUser } from '../store/user/selectors';

export function usePermissionCheck(...expectedPermission: AvailablePersmissions[]) {
  const [hasAccess, setHasAccess] = useState(false);
  const user = useSelector(selectLoggedUser);

  useEffect(() => {
    if (user && user.permissions.length) {
      const expected = expectedPermission.join(',').toLowerCase();

      setHasAccess(user.permissions.some((permisssion) =>
        expected.search(permisssion.toLowerCase()) > -1)
      );
    } else {
      setHasAccess(false);
    }
  }, [expectedPermission, user]);

  return hasAccess;
}
