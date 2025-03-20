import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api/api";
import { toCommonError } from "../utils/errorCommon";
import { useDispatch } from "../store/hooks";
import { userSlice } from "../store/user/reducer";
import { storageToken } from "../utils/storage/items";
import { useLocation, useNavigate } from "react-router";
import { AppRoute } from "../const/routes";
import type { User } from "../api/types";

export function useAuthByToken() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isExec = useRef<boolean>(false);

  const [userByToken, setUser] = useState<User | void>();
  const [toLogin, setToLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean | undefined>();

  useEffect(() => {
    if (toLogin && !userByToken) {
      if (location.pathname === AppRoute.singup) {
        navigate(AppRoute.singup);
        return;
      }

      navigate(AppRoute.login);
    } else if (userByToken) {
      navigate(location.pathname);
    }
  }, [userByToken, toLogin]);

  const fetchByToken = useCallback(async () => {
    if (!isExec.current) {
      const token = storageToken.get();

      isExec.current = true;

      try {
        if (token) {
          api.setToken(`Bearer ${token}`);

          const user = await api.me();

          dispatch(userSlice.actions.setLoggedUser(user));
          setUser(user);
          setLoading(false);

          return;
        } else {
          setToLogin(true);
          setLoading(false);
        }
      } catch (ex) {
        setToLogin(true);
        setLoading(false);
        storageToken.remove();
        console.error(toCommonError(ex));
      }
    }
  }, [loading, userByToken, toLogin]);

  return { loading, fetchByToken };
}

