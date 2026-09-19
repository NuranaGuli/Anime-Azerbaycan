"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentService } from "@/lib/services/commentService";
import { ApiRequestError } from "@/lib/apiClient";
import type { Comment } from "@/types";

export function useComments(slug: string) {
  return useQuery({
    queryKey: ["comments", slug],
    queryFn: ({ signal }) => commentService.list(slug, signal),
    enabled: !!slug,
  });
}

export function useCreateComment(slug: string) {
  const queryClient = useQueryClient();
  return useMutation<Comment, ApiRequestError, string>({
    mutationFn: (content) => commentService.create(slug, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      queryClient.invalidateQueries({ queryKey: ["profile-stats"] });
      toast.success("Şərhiniz əlavə edildi.");
    },
    onError: (error) => {
      toast.error(error.message || "Şərh göndərilə bilmədi.");
    },
  });
}

export function useDeleteComment(slug: string) {
  const queryClient = useQueryClient();
  return useMutation<{ ok: true }, ApiRequestError, string>({
    mutationFn: (commentId) => commentService.remove(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      queryClient.invalidateQueries({ queryKey: ["profile-stats"] });
      toast.success("Şərh silindi.");
    },
    onError: (error) => {
      toast.error(error.message || "Şərh silinə bilmədi.");
    },
  });
}
