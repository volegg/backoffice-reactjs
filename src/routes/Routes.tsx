import { AppRoles } from "../const/roles";
import { useSelector } from "../store/hooks";
import { selectLoggedUser } from "../store/user/selectors";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./Public";
import { StandartRoutes } from "./StandartRoutes";

export function Routes() {
  const user = useSelector(selectLoggedUser);

  let activeRole: AppRoles | undefined;

  if (user) {
    if (user.roles.includes(AppRoles.admin)) {
      activeRole = AppRoles.admin;
    }

    if (user.roles.includes(AppRoles.standart)) {
      activeRole = AppRoles.standart;
    }
  }

  if (!activeRole) {
    return <PublicRoutes />;
  }

  return <>
    {activeRole === AppRoles.admin ? <AdminRoutes /> : null}
    {activeRole === AppRoles.standart ? <StandartRoutes /> : null}
  </>
}