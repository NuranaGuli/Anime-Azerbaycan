"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, X } from "lucide-react";
import { commentSchema, type CommentFormValues } from "@/lib/schemas/interactionSchemas";
import { Button } from "@/components/ui/Button";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  replyingToName?: string;
  onCancelReply?: () => void;
  autoFocus?: boolean;
  compact?: boolean;
}

export function CommentForm({
  onSubmit,
  isSubmitting,
  replyingToName,
  onCancelReply,
  autoFocus,
  compact,
}: CommentFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const { ref: contentRef, ...contentField } = register("content");

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  const submit = (values: CommentFormValues) => {
    onSubmit(values.content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <label htmlFor="comment-content" className="sr-only">
        Şərh yaz
      </label>
      {replyingToName && (
        <div className="flex items-center justify-between rounded-md bg-surface-hover px-3 py-1.5 text-xs text-text-secondary">
          <span>
            Cavab verilir: <span className="font-medium text-text-primary">{replyingToName}</span>
          </span>
          {onCancelReply && (
            <button
              type="button"
              onClick={onCancelReply}
              aria-label="Cavabı ləğv et"
              className="rounded p-0.5 hover:bg-surface hover:text-text-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
      <textarea
        id="comment-content"
        {...contentField}
        ref={(el) => {
          contentRef(el);
          textareaRef.current = el;
        }}
        rows={compact ? 2 : 3}
        placeholder={replyingToName ? "Cavabını yaz..." : "Bu anime haqqında fikrini bölüş..."}
        aria-invalid={!!errors.content}
        className="w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div className="flex items-center justify-between">
        {errors.content ? (
          <p className="text-sm text-error">{errors.content.message}</p>
        ) : (
          <span />
        )}
        <Button type="submit" size="sm" isLoading={isSubmitting}>
          <Send className="h-4 w-4" />
          Göndər
        </Button>
      </div>
    </form>
  );
}
