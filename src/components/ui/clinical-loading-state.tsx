import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ClinicalLoadingStateProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  detail?: React.ReactNode;
}

export function ClinicalLoadingState({
  label,
  detail,
  className,
  ...props
}: ClinicalLoadingStateProps) {
  return (
    <div
      data-slot="clinical-loading-state"
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-clinical border border-clinical-border bg-clinical-surface px-4 py-3",
        className
      )}
      {...props}
    >
      <LoaderCircle
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 animate-spin text-clinical-teal motion-reduce:animate-none"
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-clinical-text">{label}</p>
        {detail && <p className="mt-0.5 text-sm leading-6 text-clinical-muted">{detail}</p>}
      </div>
    </div>
  );
}
