// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

type AccessType = 'create' | 'view' | 'edit' | 'delete' | 'transactions';

type AvailablePersmissions = `${string}:${AccessType}`;