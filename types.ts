
export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface Message {
  text: string;
  sender: Sender;
}

export enum LayerID {
  Firewall = 'FIREWALL',
  Database = 'DATABASE',
  TinyML = 'TINY_ML',
  TinyLLM = 'TINY_LLM',
  TinyAI = 'TINY_AI',
  LargeModel = 'LARGE_MODEL',
  Error = 'ERROR',
}

export interface Layer {
  id: LayerID;
  title: string;
  description: string;
}
