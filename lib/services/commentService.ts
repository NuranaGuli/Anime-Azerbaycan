import { apiClient } from "@/lib/apiClient";
import type { Comment } from "@/types";

export const commentService = {
  list: (slug: string, signal?: AbortSignal) => apiClient.get<{ items: Comment[] }>(`/api/anime/${slug}/comments`, signal),

  create: (slug: string, content: string) =>
    apiClient.post<Comment>(`/api/anime/${slug}/comments`, { content }),

  remove: (commentId: string) => apiClient.delete<{ ok: true }>(`/api/comments/${commentId}`),
};
