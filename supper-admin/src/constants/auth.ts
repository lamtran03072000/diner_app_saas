export const SupperAdminRole = {
  MANAGER: "manager",
  STAFF: "staff",
} as const;

export type SupperAdminRoleType =
  (typeof SupperAdminRole)[keyof typeof SupperAdminRole];
