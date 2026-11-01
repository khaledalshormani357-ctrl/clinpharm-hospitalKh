import * as React from "react";
import { cn } from "@/lib/utils";

export interface ClinicalEmptyStateProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function ClinicalEmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: ClinicalEmptyStateProps) {
  return (
    <div
      data-slot="clinical-empty-state"
      className={cn(
        "flex min-w-0 flex-col items-center justify-center gap-2 px-4 py-8 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="mb-1 flex size-9 items-center justify-center rounded-full border border-clinical-border bg-clinical-surface-subtle text-clinical-muted [&_svg]:size-4"
        >
          {icon}
        </span>
      )}
      <h3 className="text-sm font-semibold text-clinical-text">{title}</h3>
      {description && (
        <p className="max-w-prose text-sm leading-6 text-clinical-muted">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
