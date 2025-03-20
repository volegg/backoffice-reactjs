import { createAction } from "@reduxjs/toolkit";
import { User } from "../../api/types";

export const setLoggedUserAction = createAction<User>("ui/user");
