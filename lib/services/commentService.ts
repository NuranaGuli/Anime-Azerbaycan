import { apiClient } from "@/lib/apiClient";
import type { Comment } from "@/types";

export const commentService = {
  list: (slug: string, signal?: AbortSignal) => apiClient.get<{ items: Comment[] }>(`/api/anime/${slug}/comments`, signal),

 create: (
  slug: string,
  content: string,
  parentId?: string | null
) =>
  apiClient.post<Comment>(`/api/anime/${slug}/comments`, {
    content,
    parentId,
  }),

  remove: (commentId: string) => apiClient.delete<{ ok: true }>(`/api/comments/${commentId}`),
};
