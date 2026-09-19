"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { commentSchema, type CommentFormValues } from "@/lib/schemas/interactionSchemas";
import { Button } from "@/components/ui/Button";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
}

export function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const submit = (values: CommentFormValues) => {
    onSubmit(values.content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <label htmlFor="comment-content" className="sr-only">
        Şərh yaz
      </label>
      <textarea
        id="comment-content"
        {...register("content")}
        rows={3}
        placeholder="Bu anime haqqında fikrini bölüş..."
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
