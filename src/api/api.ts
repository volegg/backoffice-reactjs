import { toCommonError } from "../utils/errorCommon";
import { Transaction, User } from "./types";

let token = "";
const domain = process.env.NODE_ENV === 'production' ? "/cv/backoffice/" : 'http://localhost:3333/';
const basePath = "api";

const GET = 'GET';
const POST = 'POST';
const PATCH = 'PATCH';


export const api = {
    setToken(jwt: string) {
        token = jwt;
    },
    login: createHttp<LoginOptions, LoginResponse>("/auth/login"),
    logout: createHttp("/auth/logout", POST),
    signup: createHttp<SignupOptions, SignupResponse>("/auth/register"),
    me: createHttp<void, User>("/auth/me", GET),
    updateMe: createHttp<Partial<User>, User>("/users/me", PATCH),
    users: createHttp<void, User[]>("/users", GET),
    transactions: createHttp<void, Transaction[]>("/transactions", GET),
    transactionsMy: createHttp<void, Transaction[]>("/transactions/my", GET),
};

function createHttp<TOptions = void, TResponse = void>(path: string, method = POST) {
    return (options?: TOptions): Promise<TResponse> => {
        let body: string;
        let query: string;

        return new Promise(async (resolve, reject) => {
            try {
                if (method === GET && options) {
                    query = Object.entries(options).reduce((q, [key, value]) => {
                        if (value !== null && value !== undefined) {
                            q += `&${key}=${value.toString()}`;
                        }

                        return q;
                    }, "");
                } else if ([POST, PATCH].includes(method) && options) {
                    body = JSON.stringify(options);
                }
            } catch (ex) {
                reject(toCommonError(ex));

                return;
            }

            const headers = {};

            if (body) {
                headers['Content-Type'] = 'application/json';
            }

            if (token) {
                headers['Authorization'] = token;
            }

            try {
                const response = await fetch(`${domain}${basePath}${path}${query ? "?" + query : ""}`, {
                    method,
                    body,
                    headers,
                });

                const data = await response.json();

                if (response.ok) {
                    resolve(data);

                    return;
                }

                reject(data);
            } catch (ex) {
                reject(toCommonError(ex));
            }
        });
    };
}
