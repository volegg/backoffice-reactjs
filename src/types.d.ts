// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

type LoginOptions = { email: string; password: string };
type SignupOptions = LoginOptions;

type LoginResponse = { expires: number; token: string };
type SignupResponse = LoginResponse;

type CommonError = {
  error: string;
  messages: string[];
  statusCode?: number;
}

type PaginationOptions = {
  page: number;
  limit: number;
}

type Paginatted<T> = PaginationOptions & {
  items: T[];
  total: number;
  totalPages: number;
}
