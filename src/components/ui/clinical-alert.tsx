import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type ClinicalAlertTone = "info" | "success" | "warning" | "danger";

const toneClasses: Record<ClinicalAlertTone, string> = {
  info: "border-clinical-info/30 bg-clinical-info-soft text-clinical-info",
  success: "border-clinical-success/30 bg-clinical-success-soft text-clinical-success",
  warning: "border-clinical-warning/30 bg-clinical-warning-soft text-clinical-warning",
  danger: "border-clinical-danger/30 bg-clinical-danger-soft text-clinical-danger",
};

const toneIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: ShieldAlert,
} satisfies Record<ClinicalAlertTone, React.ComponentType<React.ComponentProps<"svg">>>;

export interface ClinicalAlertProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  tone?: ClinicalAlertTone;
  heading?: React.ReactNode;
}

export function ClinicalAlert({
  tone = "info",
  heading,
  className,
  children,
  ...props
}: ClinicalAlertProps) {
  const Icon = toneIcons[tone];
  const isUrgent = tone === "warning" || tone === "danger";

  return (
    <div
      data-slot="clinical-alert"
      data-tone={tone}
      role={isUrgent ? "alert" : "status"}
      aria-live={isUrgent ? "assertive" : "polite"}
      aria-atomic="true"
      className={cn(
        "flex min-w-0 gap-3 rounded-clinical border px-3.5 py-3 text-sm leading-6",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0">
        {heading && <p className="font-semibold">{heading}</p>}
        {children && <div className={cn(heading && "mt-0.5", "text-current")}>{children}</div>}
      </div>
    </div>
  );
}
