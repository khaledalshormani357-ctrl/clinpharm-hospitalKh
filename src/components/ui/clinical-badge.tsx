import * as React from "react";
import { cn } from "@/lib/utils";

export type ClinicalBadgeTone = "neutral" | "info" | "verified" | "review" | "critical";

const toneClasses: Record<ClinicalBadgeTone, string> = {
  neutral: "border-clinical-border bg-clinical-surface-subtle text-clinical-muted",
  info: "border-clinical-info/25 bg-clinical-info-soft text-clinical-info",
  verified: "border-clinical-success/25 bg-clinical-success-soft text-clinical-success",
  review: "border-clinical-warning/25 bg-clinical-warning-soft text-clinical-warning",
  critical: "border-clinical-danger/25 bg-clinical-danger-soft text-clinical-danger",
};

export interface ClinicalBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  tone?: ClinicalBadgeTone;
}

export function ClinicalBadge({
  className,
  tone = "neutral",
  ...props
}: ClinicalBadgeProps) {
  return (
    <span
      data-slot="clinical-badge"
      data-tone={tone}
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium leading-5",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
