export function toCommonError(ex: AnyType): CommonError {
  const error = (ex as Error);
  const msg = Array.isArray(ex.message) ? ex.message : (ex.message ?? '').split('\n');

  return {
    error: error.name,
    messages: msg,
    statusCode: undefined,
  };
}