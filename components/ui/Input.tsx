import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, rightElement, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-text-primary placeholder:text-text-muted",
              "transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
              error && "border-error focus:border-error focus:ring-error",
              rightElement && "pr-10",
              className
            )}
            {...props}
          />
          {rightElement && <div className="absolute right-1 top-1/2 -translate-y-1/2">{rightElement}</div>}
        </div>
        {error ? (
          <p id={errorId} className="text-sm text-error">
            {error}
          </p>
        ) : hint ? (
          <p className="text-sm text-text-muted">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
