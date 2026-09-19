import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .min(2, "Şərh ən azı 2 simvoldan ibarət olmalıdır")
    .max(1000, "Şərh maksimum 1000 simvol ola bilər"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

export const ratingSchema = z.object({
  value: z
    .number({ invalid_type_error: "Rating rəqəm olmalıdır" })
    .int("Rating tam ədəd olmalıdır")
    .min(1, "Rating ən azı 1 olmalıdır")
    .max(10, "Rating maksimum 10 ola bilər"),
});

export type RatingFormValues = z.infer<typeof ratingSchema>;
