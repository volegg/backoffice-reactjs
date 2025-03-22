export function camelCaseToWords(str: string): string {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}