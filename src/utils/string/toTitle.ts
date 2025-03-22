import { camelCaseToWords } from "./camelCaseToWords";
import { capitalize } from "./capitalize";

export function toTtitle(prop: string) {
  return capitalize(camelCaseToWords(prop));
}