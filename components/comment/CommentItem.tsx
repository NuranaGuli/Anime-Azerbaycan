"use client";

import { Reply, Trash2, UserCircle2 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isAuthenticated?: boolean;
  onReply?: (comment: Comment) => void;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  onDelete,
  isDeleting,
  isAuthenticated,
  onReply,
  isReply,
}: CommentItemProps) {
  return (
    <div className={isReply ? "" : "flex flex-col gap-3"}>
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
          {isAuthenticated && onReply && (
            <button
              onClick={() => onReply(comment)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors hover:text-primary"
            >
              <Reply className="h-3.5 w-3.5" />
              Cavab yaz
            </button>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-6 flex flex-col gap-3 border-l border-border pl-4 sm:ml-10">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              isDeleting={isDeleting}
              isAuthenticated={isAuthenticated}
              onReply={onReply}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}