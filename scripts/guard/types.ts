export type Severity = "error" | "warning";

export type Finding = {
  rule: string;
  severity: Severity;
  /** Route, file, or file › content path. */
  where: string;
  match: string;
  fix: string;
};

export type Mode = "dev" | "prod";
