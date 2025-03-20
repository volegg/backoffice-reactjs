import { useState, useCallback } from "react";
import { api } from "../api/api";
import { AuthType } from "../const/auth";
import { toCommonError } from "../utils/errorCommon";
import { useDispatch } from "../store/hooks";
import { userSlice } from "../store/user/reducer";
import { storageToken } from "../utils/storage/items";
import { useNavigate } from "react-router";
import { AppRoute } from "../const/routes";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<CommonError | void>();
  const [loading, setLoading] = useState<boolean>(false);

  const logout = useCallback(async () => {
    setLoading(true);
    setError();

    try {
      await api.logout();

      api.setToken('');

      dispatch(userSlice.actions.reset());
      storageToken.remove();
      navigate(AppRoute.login);

    } catch (ex) {
      setError(toCommonError(ex));
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, logout, setError };
}
