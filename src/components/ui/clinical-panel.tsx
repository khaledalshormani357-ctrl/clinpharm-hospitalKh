import * as React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export interface ClinicalPanelProps extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  contentClassName?: string;
  surface?: "default" | "subtle";
  headingAs?: "h2" | "h3" | "h4";
}

export function ClinicalPanel({
  title,
  description,
  actions,
  contentClassName,
  surface = "default",
  headingAs = "h2",
  className,
  children,
  ...props
}: ClinicalPanelProps) {
  const headingId = useId();
  const Heading = headingAs;
  const hasHeader = Boolean(title || description || actions);

  return (
    <section
      data-slot="clinical-panel"
      data-surface={surface}
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        "min-w-0 overflow-hidden rounded-clinical border border-clinical-border shadow-clinical",
        surface === "default" ? "bg-clinical-surface" : "bg-clinical-surface-subtle",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-clinical-border px-4 py-3 sm:px-5">
          <div className="min-w-0">
            {title && (
              <Heading
                id={headingId}
                className="text-sm font-semibold leading-6 text-clinical-text sm:text-base"
              >
                {title}
              </Heading>
            )}
            {description && (
              <p className="mt-0.5 text-sm leading-6 text-clinical-muted">{description}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn("min-w-0 p-4 sm:p-5", contentClassName)}>{children}</div>
    </section>
  );
}
