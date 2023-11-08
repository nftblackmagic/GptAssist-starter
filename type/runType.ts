export interface IRun {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string;
  thread_id: string;
  status: "completed" | "in-progress" | "failed" | "cancelled"; // assuming these are the possible statuses
  started_at: number;
  expires_at: number | null;
  cancelled_at: number | null;
  failed_at: number | null;
  completed_at: number | null;
  last_error: string | null;
  model: string;
  instructions: string | null;
  tools: Array<{ type: string }>;
  file_ids: string[];
  metadata: Record<string, unknown>;
}

export interface IRunStep {
  id: string;
  object: string;
  created_at: number;
  run_id: string;
  assistant_id: string;
  thread_id: string;
  type: "message_creation"; // Use a string literal type if this is a finite set of known types
  status: "completed" | "in-progress" | "failed" | "cancelled"; // Adjust based on possible statuses
  cancelled_at: number | null;
  completed_at: number | null;
  expired_at: number | null;
  failed_at: number | null;
  last_error: string | null;
  step_details: {
    type: string; // This could be further refined to a specific set of types if known
    message_creation?: {
      message_id: string;
    };
    // Include additional types here if step_details can have other types
  };
}
