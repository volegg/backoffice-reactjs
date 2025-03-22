import { useState, useCallback } from 'react';
import { api } from '../api/api';
import { AuthType } from '../const/auth';
import { toCommonError } from '../utils/errorCommon';
import type { User } from '../api/types';
import { useDispatch } from '../store/hooks';
import { userSlice } from '../store/user/reducer';
import { storageToken } from '../utils/storage/items';
import { useNavigate } from 'react-router';
import { AppRoute } from '../const/routes';

export function useAuth(authType: AuthType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<CommonError | void>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | void>();

  const fetch = useCallback(async (options: SignupOptions) => {
    setLoading(true);
    setError();

    try {
      const result = await (authType === AuthType.login ? api.login : api.signup)(options);

      api.setToken(`Bearer ${result.token}`);

      const fetchedUser = await api.me();

      dispatch(userSlice.actions.setLoggedUser(fetchedUser));
      storageToken.set(result.token);
      navigate(AppRoute.profile);

    } catch (ex) {
      storageToken.remove();
      setError(toCommonError(ex));
      setUser();
    } finally {
      setLoading(false);
    }
  }, [authType]);

  return { loading, error, fetch, setError, user };
}
