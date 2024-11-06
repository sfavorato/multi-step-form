export const PreferredTime = {
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
} as const;

export type PreferredTime = (typeof PreferredTime)[keyof typeof PreferredTime];
