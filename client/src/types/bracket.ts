export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface Bracket {
  id: number;
  divisionId: number;
  type: 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'POOL';
  data: JsonValue;
  createdAt: string;
  updatedAt: string;
}