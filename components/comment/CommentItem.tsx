"use client";

import { Trash2, UserCircle2 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function CommentItem({ comment, onDelete, isDeleting }: CommentItemProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-surface p-4">
      <UserCircle2 className="h-9 w-9 shrink-0 text-text-muted" aria-hidden="true" />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-text-primary">{comment.authorName}</span>
            <span className="text-xs text-text-muted">{formatRelativeTime(comment.createdAt)}</span>
          </div>
          {comment.isOwn && (
            <button
              onClick={() => onDelete(comment.id)}
              disabled={isDeleting}
              aria-label="Şərhi sil"
              className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm text-text-secondary">{comment.content}</p>
      </div>
    </div>
  );
}
