export interface IMessageContent {
  type: string;
  text: {
    value: string;
    annotations: any[]; // Replace `any` with a more specific type if possible
  };
}

export interface IMessage {
  id?: string;
  object?: string;
  created_at?: number;
  thread_id?: string;
  role: string;
  content: IMessageContent[] | string;
  file_ids?: string[];
  assistant_id?: string;
  run_id?: string;
  metadata?: Record<string, unknown>; // `unknown` can be replaced with a more specific type if the structure of metadata is known
}
