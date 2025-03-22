const localStore = createStorage(localStorage);
const sessionStore = createStorage(sessionStorage);

export function getLocalStorage() {
    return getStorage(localStore);
}

export function getSessionStorage() {
    return getStorage(sessionStore);
}

export function getStorage(storageType) {
    return { setItem: setStorageItem(storageType), getItem: getStorageItem(storageType), removeItem: removeStorageItem(storageType), existsKey: existStorageItemKey(storageType) };
}

function setStorageItem(storageType) {
    return function setItem(key, data) {
        if (data && typeof data === 'object') {
            try {
                const prev = getStorageItem(storageType)(key);
                const value = b64(JSON.stringify({
                    ...prev,
                    ...data
                }));

                storageType.setItem(b64(key), value);

                return value;
            } catch (ex) {
                console.error(ex);
            }

            return;
        }

        try {
            const value = b64(JSON.stringify(data));

            storageType.setItem(b64(key), value);

            return value;
        } catch (ex) {
            console.error(ex);
        }
    };
}

function getStorageItem(storageType) {
    return function getItem(key) {
        try {
            const data = storageType.getItem(b64(key));

            if (data !== null) {
                return JSON.parse(b64(data, 0));
            }
        } catch (ex) {
            console.error(ex);
        }
    };
}

function removeStorageItem(storageType) {
    return function removeItem(key) {
        storageType.removeItem(b64(key));
    };
}

function existStorageItemKey(storageType) {
    return function existKey(key) {
        try {
            return !!storageType.getItem(b64(key));
        } catch (_) {
            return false;
        }
    };
}

function createStorage(windowStorageType) {
    const test = "test";

    try {
        windowStorageType.setItem(test, test);
        windowStorageType.removeItem(test);

        return windowStorageType;
    } catch (e) {
        console.error("Local storage is unavailable. Application will use storage mock");
    }

    const storageMock = {};

    return {
        setItem(key, data) {
            storageMock[key] = data;
            this.length += 1;
        },
        getItem(key) {
            return storageMock[key];
        },
        removeItem(key) {
            delete storageMock[key];
            this.length -= 1;
        },
        clear() {
            Object
                .keys(storageMock)
                .forEach(this.removeItem);
        },
        key(index) {
            const keys = Object.keys(storageMock);

            if (keys.length < 1 || index > keys.length - 1) {
                return null;
            }

            return keys[index];
        },
        length: 0
    };
}

function b64(input, encode = 1) {
    return encode
        ? btoa(encodeURI(input))
        : decodeURI(atob(input));
}