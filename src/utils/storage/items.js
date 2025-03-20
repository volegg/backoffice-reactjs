import { getLocalStorage } from "./storage";

const version = "1"; // note: if storage data structure is changed update version
const localStorageWrapper = createStorageWrapper(getLocalStorage());

export const storageToken = localStorageWrapper("token");

function getKey(key) {
    return `BO_${key}:v${version}`;
}

function createStorageWrapper(storage) {
    return function createWrapper(storageKey) {
        const key = getKey(storageKey);

        return {
            set(data) {
                storage.setItem(key, data);
            },
            get() {
                return storage.getItem(key);
            },
            remove() {
                storage.removeItem(key);
            },
            exists() {
                return storage.existsKey(key);
            }
        };
    };
}
