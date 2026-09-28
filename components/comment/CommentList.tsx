"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Skeleton } from "@/components/ui/Skeleton";
import { useComments, useCreateComment, useDeleteComment } from "@/hooks/useComments";
import { useAuthStore } from "@/store/authStore";
import type { Comment } from "@/types";
import Link from "next/link";

interface CommentListProps {
  slug: string;
}

export function CommentList({ slug }: CommentListProps) {
  const { data, isLoading } = useComments(slug);
  const createComment = useCreateComment(slug);
  const deleteComment = useDeleteComment(slug);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [replyTarget, setReplyTarget] = useState<Comment | null>(null);

  const submitComment = (content: string) => {
    createComment.mutate(
      { content, parentId: replyTarget?.id ?? null },
      { onSuccess: () => setReplyTarget(null) }
    );
  };

 const totalCount = data?.items.length ?? 0;
  return (
    <section className="flex flex-col gap-4" aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="flex items-center gap-2 font-display text-xl font-semibold">
        <MessageSquare className="h-5 w-5 text-primary" />
        Şərhlər {data ? `(${totalCount})` : ""}
      </h2>

      {isAuthenticated ? (
        <CommentForm
          onSubmit={submitComment}
          isSubmitting={createComment.isPending}
          replyingToName={replyTarget?.authorName}
          onCancelReply={() => setReplyTarget(null)}
          autoFocus={!!replyTarget}
        />
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-surface/50 p-4 text-sm text-text-secondary">
          Şərh yazmaq üçün{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            daxil olun
          </Link>
          .
        </p>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : data && data.items.length > 0 ? (
        <div className="flex flex-col gap-3">
          {data.items.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={(id) => deleteComment.mutate(id)}
              isDeleting={deleteComment.isPending}
              isAuthenticated={isAuthenticated}
              onReply={setReplyTarget}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-text-secondary">
          Hələ heç bir şərh yoxdur. İlk şərhi sən yaz!
        </p>
      )}
    </section>
  );
}