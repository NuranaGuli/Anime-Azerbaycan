"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/authSchemas";
import { useRegister } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values, {
      onSuccess: () => router.push("/profile"),
      onError: (error) => {
        if (error.fieldErrors) {
          Object.entries(error.fieldErrors).forEach(([field, message]) => {
            setError(field as keyof RegisterFormValues, { message });
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4" noValidate>
      <Input
        label="İstifadəçi adı"
        autoComplete="username"
        error={errors.username?.message}
        {...register("username")}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Şifrə"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Şifrəni təsdiqlə"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" size="lg" className="mt-2 w-full" isLoading={registerMutation.isPending}>
        <UserPlus className="h-4 w-4" />
        Qeydiyyatdan keç
      </Button>
    </form>
  );
}
