import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user/reducer";

const reducer = combineReducers({
    userReducer,
});

export function getStore() {
    return configureStore({ reducer });
}

export type State = ReturnType<typeof reducer>;
export type Store = ReturnType<typeof getStore>;
export type Dispatch = Store["dispatch"];
