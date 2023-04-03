export type KeyValue<T> = {
  [key: string]: T;
};

export interface AppError {
  title?: string;
  messages: string[];
}

export type CSSClassAttribute = string | KeyValue<boolean> | (string | KeyValue<boolean>)[];
