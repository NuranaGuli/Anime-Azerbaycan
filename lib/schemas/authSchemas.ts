import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email tələb olunur").email("Email düzgün formatda deyil"),
  password: z.string().min(1, "Şifrə tələb olunur"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "İstifadəçi adı ən azı 3 simvoldan ibarət olmalıdır")
      .max(20, "İstifadəçi adı maksimum 20 simvol ola bilər")
      .regex(/^[a-zA-Z0-9_]+$/, "İstifadəçi adı yalnız hərf, rəqəm və alt xətt (_) ehtiva edə bilər"),
    email: z.string().min(1, "Email tələb olunur").email("Email düzgün formatda deyil"),
    password: z.string().min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır"),
    confirmPassword: z.string().min(1, "Şifrəni təsdiqləyin"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifrələr uyğun gəlmir",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
