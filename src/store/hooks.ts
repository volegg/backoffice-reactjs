import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

import type { Dispatch, State } from "./store";

export function useDispatch() {
    return useReduxDispatch<Dispatch>();
}

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
